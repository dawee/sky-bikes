const createModelMock = (db, name) => {
  let idCounter = db.documents[name]
    ? Object.keys(db.documents[name]).length
    : 0;

  return class ModelMock {
    static findOne(filter) {
      const document = db.findOneDocument(name, filter);

      return Promise.resolve(document ? new ModelMock(document) : null);
    }

    static find(filter) {
      const documents = db.findDocuments(name, filter);

      return Promise.resolve(
        documents.map(document => new ModelMock(document))
      );
    }

    constructor(document) {
      this.document = document;
    }

    toObject() {
      return this.document;
    }

    save() {
      if (!this.document._id) {
        this.document._id = idCounter++;
      }

      db.saveDocument(name, this.document._id, this.document);

      return Promise.resolve(new ModelMock(this.document));
    }
  };
};

const createFilterPredicate = filter => document =>
  Object.keys(filter).every(key => document[key] === filter[key]);

class DBMock {
  constructor(fixtures) {
    this.documents = Object.create(fixtures || {});
  }

  findDocument(name, predicate) {
    if (!this.documents[name]) {
      return null;
    }

    const foundId = Object.keys(this.documents[name]).find(id =>
      predicate(this.documents[name][id])
    );

    if (foundId === null || foundId === undefined) {
      return null;
    }

    return this.documents[name][foundId];
  }

  filterDocuments(name, predicate) {
    if (!this.documents[name]) {
      return [];
    }

    return Object.keys(this.documents[name])
      .filter(id => predicate(this.documents[name][id]))
      .map(id => this.documents[name][id]);
  }

  findDocuments(name, filter) {
    const predicate = filter ? createFilterPredicate(filter) : () => true;

    return this.filterDocuments(name, predicate);
  }

  findOneDocument(name, filter) {
    const predicate = filter ? createFilterPredicate(filter) : () => true;

    return this.findDocument(name, predicate);
  }

  saveDocument(name, id, data) {
    if (!this.documents[name]) {
      this.documents[name] = {};
    }

    this.documents[name][id] = data;
  }
}

class SchemaMock {
  static get Types() {
    return { ObjectId: null };
  }
}

const createMongooseMock = fixtures => {
  const db = new DBMock(fixtures);
  const connect = () => db;
  const model = name => createModelMock(db, name);

  return { connect, model, Schema: SchemaMock };
};

module.exports = createMongooseMock;

const createModelMock = (db, name) => {
  let idCounter = 0;

  return class ModelMock {
    static findOne(filter) {
      const document = db.findOneDocument(name, filter);

      return Promise.resolve(document ? new ModelMock(document) : null);
    }

    constructor(document) {
      this.document = document;
    }

    toObject() {
      return this.document;
    }

    save() {
      const document = this.document._id
        ? this.document
        : { _id: idCounter++, ...this.document };

      return Promise.resolve(
        db.saveDocument(name, this.document._id, document)
      );
    }
  };
};

class DBMock {
  constructor() {
    this.documents = {};
  }

  findDocument(name, predicate) {
    if (!this.documents[name]) {
      return null;
    }

    const foundId = Object.keys(this.documents[name]).find(id =>
      predicate(this.documents[name][id])
    );

    return this.documents[name][foundId];
  }

  findOneDocument(name, filter) {
    return this.findDocument(name, document =>
      Object.keys(filter).every(key => document[key] === filter[key])
    );
  }

  saveDocument(name, id, data) {
    if (!this.documents[name]) {
      this.documents[name] = {};
    }

    this.documents[name][id] = data;
  }
}

class SchemaMock {}

const createMongooseMock = () => {
  const db = new DBMock();
  const connect = () => db;
  const model = name => createModelMock(db, name);

  return { connect, model, Schema: SchemaMock };
};

module.exports = createMongooseMock;

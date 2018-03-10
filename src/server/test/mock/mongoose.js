const createModelMock = (db, name) => {
  let idCounter = 0;

  return class {
    constructor(data) {
      this.data = { _id: idCounter, ...data };
      idCounter++;
    }

    toObject() {
      return this.data;
    }

    save() {
      return Promise.resolve(db.saveDocument(name, this.data._id, this.data));
    }
  };
};

class DBMock {
  constructor() {
    this.documents = {};
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

  return {connect, model, Schema: SchemaMock};
};

module.exports = { createMongooseMock };

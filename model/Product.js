const fs = require("fs");
const path = require("path");

module.exports = class Products {
  constructor({ title, author, Category, price, img }) {
    this.title = title;
    this.author = author;
    this.Category = Category;
    this.price = price;
    this.img = img;
  }
  static updateProd(obj) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let product = [];
      if (!err) {
        product = JSON.parse(fileContent);
      }
      let data = product.find((prod) => prod.id == obj.id);
      data.id = obj.id;
      data.title = obj.title;
      data.author = obj.author;
      data.Category = obj.Category;
      data.price = obj.price;
      data.img = obj.img;
      fs.writeFile(p, JSON.stringify(product, null, 2), (err) => {
        console.log(err);
      });
    });
  }

  static fetchId(id, cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let product = [];
      if (!err) {
        product = JSON.parse(fileContent);
      }
      let data = product.filter((prod) => prod.id == id);
      cb(data);
    });
  }

  static delete(obj) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let product = [];
      if (!err) {
        product = JSON.parse(fileContent);
      }
      let data = product.find((prod) => prod.id == obj.id);
      product.splice(product.indexOf(data), 1);

      fs.writeFile(p, JSON.stringify(product, null, 2), (err) => {
        console.log(err);
      });
    });
  }

  save() {
    //Product.push(this);
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let product = [];
      if (!err) {
        product = JSON.parse(fileContent);
        this.id = product.length + 1;
      }
      product.push(this);
      fs.writeFile(p, JSON.stringify(product), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }

  static fetch(data, cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      let store = JSON.parse(fileContent);
      cb(
        data.map((product) => {
          return {
            ...store.find((item) => item.id == product.id),
            qty: product.qty,
          };
        })
      );
    });
  }
};

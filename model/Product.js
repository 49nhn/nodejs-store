//const Product = [];
const fs = require('fs');
const path = require('path');
// {
//  id,
//  title, 
//  author , 
//  Category, 
//  price, 
//  img
// }
module.exports = class Products {
    constructor({  title, author, Category, price, img }) {
        this.title = title;
        this.author = author;
        this.Category = Category;
        this.price = price;
        this.img = img;
    }

    save() {
        //Product.push(this);
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            let product = [];
            if (!err) {
                product = JSON.parse(fileContent);
                this.id=product.length+1;
            }
            product.push(this);
            fs.writeFile(p, JSON.stringify(product), (err) => {
                console.log(err);
            });
        })

    }

    static fetchAll(cb) {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        })
    }
}
class Product {
  constructor(
    id,
    name,
    condition,
    description,
    category,
    address,
    price,
    owner,
    photo
  ) {
    this.id = id;
    this.name = name;
    this.condition = condition;
    this.description = description;
    this.category = category;
    this.address = address;
    this.price = price;
    this.owner = owner;
    this.photo = photo;
  }
}

module.exports = Product;

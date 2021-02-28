module.exports = class Product {
    constructor(id, name,category, original_price, current_price, discount_percentage, stock, one_day_delivery) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.original_price = original_price;
        this.current_price = current_price;
        this.discount_percentage = discount_percentage;
        if (stock === 'add') {
            this.stock = true;
        }
        else {
            this.stock = false;
        }
        this.one_day_delivery = one_day_delivery;
    }

    equals(b) {
        if (this.id === b.id)
            return true;
        return false;
    }

    toString() {
        return 'ID: ' + this.id + '| Name: ' + this.name;
    }
}

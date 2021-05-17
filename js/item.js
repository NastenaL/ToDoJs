function Item(text, isActive, index, isEditable) {
    this.text = text;
    this.isActive = isActive;
    this.index = index;
    this.isEditable = isEditable;
}

function ItemsCollection() {
    this.items = [];
}

ItemsCollection.prototype.add = function(item) {
    this.items.push(item);
}

ItemsCollection.prototype.changeStatusByIndex = function(i, status) {
    this.items[i].status = status;
}
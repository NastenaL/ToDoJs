function Storage() {
    this.localStorage = window.localStorage;
}

Storage.prototype.saveTo = function(key, value) {
    this.localStorage.setItem(key, value);
}

Storage.prototype.getByKey = function(key) {
    return this.localStorage.getItem(key);
}

Storage.prototype.deleteItem = function(key) {
    this.localStorage.removeItem(key);
}

Storage.prototype.loadItems = function() {
    var itemsFromStorage = myStorage.getByKey('items');
	var todoFieldFromStorage = myStorage.getByKey('todoField');

	if(itemsFromStorage !== null)
	{
		items = JSON.parse(itemsFromStorage);
		renderer.renderItems(currentFilter);
	}

	if(todoFieldFromStorage != null)
	{
		todoField.value = todoFieldFromStorage;
	}
}

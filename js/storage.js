function getFromStorage() {
	let itemsFromStorage = myStorage.getItem('items');
	let newItemFromStorage = myStorage.getItem('newItem');

	if(itemsFromStorage.length > 0)
	{
		items = JSON.parse(itemsFromStorage);
		renderItems(currentFilter);
	}

	if(newItemFromStorage != null)
	{
		newItem.value = newItemFromStorage;
	}
	changeSelectedButton();
}

function saveToStorage() {
    localStorage.setItem('newItem', newItem.value);
}
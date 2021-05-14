var items = [];
var itemsBoard = document.getElementById('toDoItems');
var newItem = document.getElementById('todoField');
var counter = document.getElementById('counter');

function createItem(event) {
	event.preventDefault();
	newItem.value = newItem.value.trim(' ');

	let isCorrectSymbols = newItem.value.match(/^[A-Za-z0-9?!,.%&@*]+$/) === null;
	let isWithinLenght = newItem.value.length >= 3 && newItem.value.length <= 200;

	if(isWithinLenght) {
		let todoItem = {
			isActive: true,
			text: newItem.value
		}
		items.push(todoItem);
		renderItems(items);
	}
}

function editItem(i) {
	items[i].text = document.getElementById('text_item'+i).value;
	renderItems(items);
}

function deleteItem(i) {
	items.splice(i, 1);
	renderItems(items);
}

function changeItemStatus(i, state)
{
	items[i].isActive = state;
	showClearAllButton();
	renderItems(items);
}

function showClearAllButton() {
    var completedItems = items.filter(item => item.isActive === false);
    var clearButton = document.getElementById('clearAll');
    clearButton.style.display = completedItems.length > 0 ? 'inline' : 'none';
}
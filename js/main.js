var items = [];
var itemsBoard = document.getElementById('toDoItems');
var newItem = document.getElementById('todoField');
var counter = document.getElementById('counter');

function createItem(event) {
	event.preventDefault();
	newItem.value = newItem.value.trim(' ');
	newItem.value = newItem.value.trunc(10);
	
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

function showButton(i)
{
var button = document.getElementById('delete_item'+i);
button.style.display = 'inline';
}

function showTextInput(i)
{
	var textInput = document.createElement('input');
	textInput.type = "text";
	textInput.value = items[i];
}

function editItem(i) {
	var editI = document.getElementById('item'+i);
	items[i] = editI.value;
	
	renderItems(items);
}

function deleteItem(i) {
	items.splice(i, 1);
	renderItems(items);
}

function changeStatusTask(i, state)
{
	items[i].isActive = state;
	renderItems(items);
}
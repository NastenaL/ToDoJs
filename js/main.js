var items = [];
var itemsBoard = document.getElementById('toDoItems');
var newItem = document.getElementById('todoField');
var counter = document.getElementById('counter');
var myStorage = window.localStorage;
document.addEventListener("DOMContentLoaded", getFromStorage);

const filters = {
	ALL: "all",
	ACTIVE: "active",
	COMPLETED: "completed"
}

let currentFilter = filters.ALL;

var btns = document.getElementsByClassName('btn');

function changeSelectedButton()
{
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', "");
    let filter = localStorage.getItem('filter');
    switch (filter) {
        case filters.ACTIVE:
            btns[1].className += ' active';
            break;
        case filters.ALL:
            btns[0].className += ' active';
            break;
        case filters.COMPLETED:
            btns[2].className += ' active';
            break;
    };
}

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function(){
    changeSelectedButton();
  });
}

function getFromStorage() {
	var itemsFromStorage = myStorage.getItem('items');
	var newItemFromStorage = myStorage.getItem('newItem');

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

function createItem(event) {
	event.preventDefault();
	newItem.value = newItem.value.trim(' ');

	let isCorrectSymbols = newItem.value.match(/^[A-Za-z0-9?!,.%&@*]+$/) === null;
	let isWithinLenght = newItem.value.length >= 3 && newItem.value.length <= 200;

	if(isWithinLenght) {
		let todoItem = {
			isActive: true,
			text: newItem.value,
			isEditable: false
		}
		items.push(todoItem);
		renderItems(currentFilter);
	}
	newItem.value = '';
	localStorage.setItem('items', JSON.stringify(items));
	localStorage.removeItem('newItem');
}

function editItem(i) {
	items[i].text = document.getElementById('text_item'+i).value;
	renderItems(currentFilter);
	localStorage.setItem('items', JSON.stringify(items));
}

function deleteItem(i) {
	items.splice(i, 1);
	renderItems(currentFilter);
	localStorage.setItem('items', JSON.stringify(items));
}

function changeItemStatus(i, state) {
	items[i].isActive = state;
	showClearAllButton();
	renderItems(currentFilter);
}

function showClearAllButton() {
    var completedItems = items.filter(item => item.isActive === false);
    var clearButton = document.getElementById('clearAll');
    clearButton.style.display = completedItems.length > 0 ? 'inline' : 'none';
}

function saveToStorage() {
    localStorage.setItem('newItem', newItem.value);
}

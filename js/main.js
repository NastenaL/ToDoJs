var items = [];
var itemsBoard = document.getElementById('toDoItems');
var newItem = document.getElementById('todoField');
var counter = document.getElementById('counter');
var clearButton = document.getElementById('clearAll');

var myStorage = window.localStorage;
document.addEventListener("DOMContentLoaded", getFromStorage);

const filters = {
	ALL: "all",
	ACTIVE: "active",
	COMPLETED: "completed"
}

var currentFilter = filters.ALL;
var btns = document.getElementsByClassName('btn');

function changeSelectedButton()
{
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', "");
    var filter = localStorage.getItem('filter');
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

function changeItemStatus(i, state) {
	items[i].isActive = state;
	showClearAllButton();
	renderItems();
}

function showClearAllButton() {
    var completedItems = items.filter(item => item.isActive === false);
    clearButton.style.display = completedItems.length > 0 ? 'inline' : 'none';
}

function onCreateItem(event) {
	event.preventDefault();
	newItem.value = newItem.value.trim(' ');

	var isCorrectSymbols = newItem.value.match(/^[A-Za-z0-9?!,.%&@*]+$/) === null;
	var isWithinLenght = newItem.value.length >= 3 && newItem.value.length <= 200;

	if(isWithinLenght) {
		var todoItem = {
			isActive: true,
			text: newItem.value,
			isEditable: false
		}
		items.push(todoItem);
		renderItems();
	}
	newItem.value = '';
	localStorage.setItem('items', JSON.stringify(items));
	localStorage.removeItem('newItem');
}

function onEditItem(i) {
	items[i].text = document.getElementById('text_item' + i).value;
	console.log(items);
	renderItems();
	localStorage.setItem('items', JSON.stringify(items));
}

function onDeleteItem(i) {
	items.splice(i, 1);
	renderItems();
	localStorage.setItem('items', JSON.stringify(items));
}
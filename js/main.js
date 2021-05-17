var items = new ItemsCollection();
var itemsBoard = document.getElementById('toDoItems');
var todoField = document.getElementById('todoField');
var counter = document.getElementById('counter');
var clearButton = document.getElementById('clearAll');

var myStorage = new Storage();
var renderer = new Renderer();

document.addEventListener("DOMContentLoaded", function() {
	myStorage.loadItems();
	changeSelectedButton();
});

todoField.addEventListener("change", function() {
	myStorage.saveTo('todoField', todoField.value);
});

const filters = {
	ALL: "all",
	ACTIVE: "active",
	COMPLETED: "completed"
}

var currentFilter = new Filter(filters.ALL);

function changeSelectedButton()
{
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', "");
    var filter = myStorage.getByKey('filter');
    switch (filter) {
        case filters.ACTIVE:
            document.getElementById('active').className += ' active';
            break;
        case filters.ALL:
            document.getElementById('all').className += ' active';
            break;
        case filters.COMPLETED:
            document.getElementById('completed').className += ' active';
            break;
    };
}

var filterDiv = document.getElementById('filter');
filterDiv.addEventListener('click', function(){
	changeSelectedButton();
});
  
function onChangeItemStatus(i, state) {
	var item = items.filter(t => t.index === i);
	console.log(item);
	var index = items.indexOf(item);
	console.log(items[index]);
	items[index].isActive = state;
	showClearAllButton();
	renderer.renderItems();
}

function showClearAllButton() {
    var completedItems = items.filter(item => item.isActive === false);
    clearButton.style.display = completedItems.length > 0 ? 'inline' : 'none';
}

function onCreateItem(event) {
	event.preventDefault();
	todoField.value = todoField.value.trim(' ');

	var isCorrectSymbols = todoField.value.match(/^[A-Za-z0-9?!,.%&@*]+$/) === null;
	var isWithinLength = todoField.value.length >= 3 && todoField.value.length <= 200;

	if(isWithinLength) {
		var todoItem = new Item(todoField.value, true, items.items.length + 1, false);
		items.add(todoItem);
		renderer.renderItems();
	}
	todoField.value = '';
	myStorage.saveTo('items', JSON.stringify(items.items));
	myStorage.deleteItem('todoField');
}

function onEditItem(i) {
	items.items[i].text = document.getElementById('text_item' + i).value;
	renderer.renderItems();
	myStorage.saveTo('items', JSON.stringify(items.items));
}

function onDeleteItem(i) {
	items.items.splice(i, 1);
	renderer.renderItems();
	myStorage.saveTo('items', JSON.stringify(items.items));
}
var items = [];
var itemsBoard = document.getElementById('toDoItems');

window.onload = function() {
	var inputs = document.getElementsByTagName('input');  
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == 'text') {
			inputs[i].onchange = function() {
				this.value = this.value.replace(/^\s+/, '').replace(/\s+$/, '');
			};
		}
	}
}

function createItem() {
	newItem = document.getElementById('todoField').value;

	if(newItem.match(/^[A-Za-z0-9?!,.%&@*]+$/) != null 
		&& newItem.length >= 3
		&& newItem.length <= 200) {
		items.push(newItem);
		calculateCounter();
		
		document.getElementById('toDoItems').innerHTML = outputItems(items);
	}
  
  return false;
}

function calculateCounter() {
	var counter = document.getElementById('counter');
	
	if(items.length == 0)
	{
		counter.innerHTML = '';
	}
	
	counter.innerHTML = items.length + ' items left';
}

function outputItems(items){
	let result = '';
	
	items.forEach((item, i) => {
	  result += '<div ondblclick="editItem('+ i +')"><input type="checkbox" id="item_' 
	  + i + '"><input id="item'+ i +'" type="text" value="'
	  + item +'"><input onclick="deleteItem('+ i +')" type="button" id="delete_'
	  + i +'" value="x"><br></div>'	
	});
	  
	return result;
}

function editItem(i) {
	var editI = document.getElementById('item'+i);
	items[i] = editI.value;
	
	redrawItems();
}

function deleteItem(i) {
	items.splice(i, 1);
	redrawItems();
}

function redrawItems() {
	itemsBoard.innerHTML = outputItems(items);
	calculateCounter();
}

function doneItem(i) {
	var selectedItem = document.getElementById('item'+i);
}
function Renderer() {
}

Renderer.prototype.calculateCounter = function(items) {
    return counter.innerHTML = items.length === 0 ? items.length + ' item' : items.length + ' items left';
}

Renderer.prototype.renderItems = function() {
    currentItems = checkFilter();
	itemsBoard.innerHTML = '';
    
    if(currentItems.length > 0){
//select all
    }

	currentItems.forEach((item) => {
		var div = createParentDiv(item);
		var checkbox = createStatusCheckBox(item);
		var span = createSpan(item);
        var textInput  = createTextInput(item);
		var deleteButton = createDeleteItemButton(item.index);

		div.appendChild(checkbox);
        div.appendChild(textInput);
		div.appendChild(span);
        div.appendChild(deleteButton);
		itemsBoard.appendChild(div);
	});
	  
	this.calculateCounter(currentItems);
}

var selectAll = document.getElementById('selectAll');
selectAll.addEventListener('click', function () {
    selectAllItems();
});

function createSpan(item) {
    var span = document.createElement('span');
    span.innerText = item.text;
    span.id = "span" + item.index;
    span.className = 'span';
    span.style.float = 'left';
    span.style.width = '150px';

    if(!item.isActive)
	{
		span.style.textDecoration = 'line-through';
        span.style.opacity = "0.5";
	}
    span.addEventListener('dblclick', function () {
        items.forEach(item => {
            item.isEditable = false;
        });
        item.isEditable = true;
        renderTextInput();
    });
    return span;
}

function renderTextInput() {
    items.forEach((item) => {
        var checkbox = document.getElementById('checkbox' + item.index);
        var span = document.getElementById('span' + item.index);
        var button = document.getElementById('delete_item' + item.index);
        var textInput = document.getElementById('text_item' + item.index);
        
        checkbox.style.display = item.isEditable? 'none' : 'inline';
        span.style.display = item.isEditable? 'none' : 'inline';
	    button.style.display = 'none';
        textInput.style.display = item.isEditable? 'inline' : 'none';
    });
}

function createTextInput(item)
{
    var textInput  = document.createElement('input');
    textInput.type = "text";
    textInput.id = "text_item" + item.index;
    textInput.value = item.text;
    textInput.style.display = 'none';
    textInput.style.minlength = 3;
    textInput.style.maxlength = 200;

    var isWithinLenght = textInput.value.length >= 3 && textInput.value.length <= 200;

    textInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && isWithinLenght) {
            event.preventDefault();
            item.isEditable = false;
            onEditItem(item.index);
        }
    });

    document.addEventListener("blur", function() {
        if(isWithinLenght){
            item.isEditable = false;
            onEditItem(item.index);
        }
    });

    return textInput;
}

function createParentDiv(item)
{
    var div = document.createElement('div');
	div.id = "div_item" + item.index;
    div.style.height = '30px';

	div.addEventListener("mouseenter", function () {
        showDeleteButton(item);
	});

	div.addEventListener("mouseleave", function () {
        var button = document.getElementById('delete_item' + item.index);
		button.style.display = 'none';
	});
    return div;
}

function showDeleteButton(item) {
    var button = document.getElementById('delete_item' + item.index);
    if(!item.isEditable) {
        button.style.display = 'inline';
    }
}

function createStatusCheckBox(item)
{
    var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.id = "checkbox" + item.index;
    checkbox.style.float = 'left';
	checkbox.checked = !item.isActive;

	checkbox.addEventListener("change", function () {
		onChangeItemStatus(item.index, !checkbox.checked);
	});
    
    return checkbox;
}

function createDeleteItemButton(i)
{
    var deleteButton = document.createElement('button');
	deleteButton.id = "delete_item" + i;
	deleteButton.textContent = "x";
	deleteButton.style.display = 'none';
    deleteButton.style.float = 'left';

	deleteButton.addEventListener('click', function () {
		onDeleteItem(i);
	});

    return deleteButton;
}

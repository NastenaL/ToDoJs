function renderCounter(items) {
	counter.innerHTML = items.length === 0 ? items.length + ' item' : items.length + ' items left';
}

function checkFilter() {
    let filter = localStorage.getItem('filter');
    if(filter != null){
        currentFilter = filter;
    }
    var filteredItems = [];
    switch (filter) {
        case filters.ACTIVE:
            filteredItems = items.filter(item => item.isActive);
            break;
        case filters.ALL:
            filteredItems = items;
            break;
        case filters.COMPLETED:
            filteredItems = items.filter(item => !item.isActive);
            break;
    };
    return filteredItems;
}

function renderItems(currentFilter) {
    currentItems = checkFilter();
	itemsBoard.innerHTML = '';
    
    if(currentItems.length > 0){
        var selectAll = createSelectAllButton();
        itemsBoard.appendChild(selectAll);
    }

	currentItems.forEach((item, i) => {
		var div = createParentDiv(item, i);
		var checkbox = createStatusCheckBox(item, i);
		var span = createSpan(item, i);
        var textInput  = createTextInput(item, i);
		var deleteButton = createDeleteItemButton(i);

		div.appendChild(checkbox);
        div.appendChild(textInput);
		div.appendChild(span);
        div.appendChild(deleteButton);
		itemsBoard.appendChild(div);
	});
	  
	renderCounter(currentItems);
}

function createSpan(item, i) {
    var span = document.createElement('span');
    span.innerText = item.text;
    span.id = "span" + i;
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
    items.forEach((item, i) => {
        var checkbox = document.getElementById('checkbox' + i);
        var span = document.getElementById('span' + i);
        var button = document.getElementById('delete_item' + i);
        var textInput = document.getElementById('text_item' + i);
        
        checkbox.style.display = item.isEditable? 'none' : 'inline';
        span.style.display = item.isEditable? 'none' : 'inline';
	    button.style.display = 'none';
        textInput.style.display = item.isEditable? 'inline' : 'none';
    });
}

function createTextInput(item, i)
{
    var textInput  = document.createElement('input');
    textInput.type = "text";
    textInput.id = "text_item" + i;
    textInput.value = item.text;
    textInput.style.display = 'none';
    textInput.style.minlength = 3;
    textInput.style.maxlength = 200;

    let isWithinLenght = newItem.value.length >= 3 && newItem.value.length <= 200;

    textInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && isWithinLenght) {
            event.preventDefault();
            item.isEditable = false;
            editItem(i);
        }
    });
    textInput.addEventListener("blur", function() {
        if(isWithinLenght){
            item.isEditable = false;
            editItem(i);
        }
    });

    return textInput;
}

function createParentDiv(item, i)
{
    var div = document.createElement('div');
	div.id = "div_item" + i;
    div.style.height = '30px';

	div.addEventListener("mouseenter", function () {
        if(!item.isEditable) {
            let button = document.getElementById('delete_item' + i);
            button.style.display = 'inline';
        }
	});

	div.addEventListener("mouseleave", function () {
		let button = document.getElementById('delete_item' + i);
		button.style.display = 'none';
	});
    return div;
}

function createStatusCheckBox(item, i)
{
    var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.id = "checkbox" + i;
        checkbox.style.float = 'left';
		checkbox.checked = !item.isActive;

		checkbox.addEventListener("change", function () {
			changeItemStatus(i, !item.isActive);
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
			deleteItem(i);
		});

        return deleteButton;
}

function createSelectAllButton()
{
    var selectAll = document.createElement('button');
    selectAll.textContent = "SelectAll";
    selectAll.style.margin = "10px";

    selectAll.addEventListener('click', function () {
		selectAllItems();
	});

    return selectAll;
}
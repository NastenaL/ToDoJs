function renderCounter(items) {
	counter.innerHTML = items.length === 0 ? '' : items.length + ' items left';
}

function renderItems(items){
	itemsBoard.innerHTML = '';
    var selectAll = createSelectAllButton();
    itemsBoard.appendChild(selectAll);

	items.forEach((item, i) => {
		var div = createParentDiv(item, i);
		var checkbox = createStatusCheckBox(item, i);

		var span = document.createElement('span');
		span.innerText = item.text;
        span.id = "span" + i;
        span.addEventListener('dblclick', function () {
			renderTextInput(i);
		});

        var textInput  = document.createElement('input');
        textInput.type = "text";
        textInput.id = "text_item" + i;
        textInput.value = item.text;
        textInput.style.display = 'none';
        textInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
			    editItem(i);
            }
        });

		var deleteButton = createDeleteItemButton(i);

		div.appendChild(checkbox);
        div.appendChild(textInput);
		div.appendChild(span);
		div.appendChild(deleteButton);
		div.appendChild(document.createElement('br'));
		itemsBoard.appendChild(div);
	});
	  
	renderCounter(items);
}

function renderTextInput(i) {
    var span = document.getElementById('span' + i);
    span.style.display = 'none';
    let button = document.getElementById('delete_item' + i);
		button.style.display = 'none';
    var textInput = document.getElementById('text_item' + i);
    textInput.style.display = 'inline';
}

function createParentDiv(item, i)
{
    var div = document.createElement('div');
	div.id = "div_item" + i;
		
	if(!item.isActive)
	{
		div.style.textDecoration = 'line-through';
	}

	div.addEventListener("mouseenter", function () {
		let button = document.getElementById('delete_item' + i);
		button.style.display = 'inline';
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
		checkbox.id = "id" + i;
		checkbox.checked = !item.isActive;

		checkbox.addEventListener("change", function () {
			changeStatusTask(i, !item.isActive);
		});
    
        return checkbox;
}

function createDeleteItemButton(i)
{
    var deleteButton = document.createElement('button');
		deleteButton.id = "delete_item" + i;
		deleteButton.textContent = "x";
		deleteButton.style.display = 'none';

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
		completedAllItems();
	});

    return selectAll;
}
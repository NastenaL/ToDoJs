function getItemsByStatus(status)
{
    var result = items.filter(item => item.isActive === status)
    renderItems(result);
    var completedItems = items.forEach(item => item.isActive === false);

    var clearButton = document.getElementById('clearAll');
    console.log(clearButton);
    clearButton.style.display = completedItems !== null? 'inline' : 'none';
}

function getAllItems()
{
	renderItems(items);
}

function clearItems()
{
    items = items.filter(function(x) { return x.isActive !== false; });
    renderItems(items);
}

function completedAllItems()
{
    var newItems = items.forEach((item, i) => {
        item.isActive = !item.isActive;
    });
    console.log(newItems);
    renderItems(newItems);
}
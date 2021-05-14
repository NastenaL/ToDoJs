function getItemsByStatus(status)
{
    var result = items.filter(item => item.isActive === status)
    renderItems(result);
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
    var completedItems = items.forEach((item, i) => {
        item.isActive = !item.isActive;
    });
    renderItems(completedItems);
}
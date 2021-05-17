function getItemsByStatus(status)
{
    var result = items.filter(item => item.isActive === status)
    currentFilter = status? filters.ACTIVE : filters.COMPLETED;
    localStorage.setItem('filter', JSON.stringify(currentFilter));
    renderItems(result);
}

function getAllItems()
{
    currentFilter = filters.ALL;
    localStorage.setItem('filter', JSON.stringify(currentFilter));
    renderItems(items);
}

function clearItems()
{
    items = items.filter(function(x) { return x.isActive; });
    renderItems(items);
}

function completedAllItems()
{
    var completedItems = items.forEach((item, i) => {
        item.isActive = !item.isActive;
    });
    renderItems(completedItems);
}
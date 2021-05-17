function getItemsByStatus(status) {
    var result = items.filter(item => item.isActive === status)
    currentFilter = status? filters.ACTIVE : filters.COMPLETED;
    console.log("test" + currentFilter);
    renderItems(result);
}

function getAllItems() {
    currentFilter = filters.ALL;
    localStorage.setItem('filter', currentFilter);
    renderItems(items);
}

function clearItems() {
    items = items.filter(function(x) { return x.isActive; });
    renderItems(items);
}

function selectAllItems() {
    var completedItems = items.filter(item => !item.isActive);
    var activeItems = items.filter(item => item.isActive);
    if(completedItems.length > 0){
        var selectedItems = items.forEach((item, i) => {
            item.isActive = false;
        });
        renderItems(selectedItems);
    }
    console.log(activeItems);
    if(activeItems.length == 0) {
        var selectedItems = items.forEach((item, i) => {
            item.isActive = true;
        });
        renderItems(selectedItems);
    }
}
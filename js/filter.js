function filterItemsByStatus(currentFilter) {
    localStorage.setItem('filter', currentFilter);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems(currentFilter);
}

function clearItems() {
    currentFilter = filters.ACTIVE;
    localStorage.setItem('filter', currentFilter);
    renderItems(currentFilter);
}

function selectAllItems() {
    var completedItems = items.filter(item => !item.isActive);
    var activeItems = items.filter(item => item.isActive);
    if(completedItems.length > 0){
        items.forEach((item, i) => {
            item.isActive = false;
        });
    }
    
    if(activeItems.length == 0) {
        items.forEach((item, i) => {
            item.isActive = true;
        });
    }
    renderItems(currentFilter);
}
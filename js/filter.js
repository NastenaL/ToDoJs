function filterItemsByStatus(currentFilter) {
    localStorage.setItem('filter', currentFilter);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}

function clearItems() {
    currentFilter = filters.ACTIVE;
    localStorage.setItem('filter', currentFilter);
    renderItems();
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
    renderItems();
}

function checkFilter() {
    var filter = localStorage.getItem('filter');
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
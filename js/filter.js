function Filter(filter){
    this.setFilter(filter);
}
    
Filter.prototype.setFilter = function(filter) {
    this.filter = filter;
}
    
Filter.prototype.getFilter = function() {
    return this.filter;
}

function onFilterItemsByStatus(filter) {
    currentFilter.setFilter(filter);
    myStorage.saveTo('filter', currentFilter.getFilter());
    myStorage.saveTo('items', JSON.stringify(items));
    renderer.renderItems();
}

var clearButton = document.getElementById('clearAll');
clearButton.addEventListener('click', function() {
    onClearCompletedItems();
});

function onClearCompletedItems() {
    items = items.filter(item => item.isActive);
    currentFilter.setFilter(filters.ACTIVE);
    myStorage.saveTo('filter', currentFilter.getFilter());
    renderer.renderItems();
}

function selectAllItems() {
    var isSomeActive = items.some(item => item.isActive);
    if(isSomeActive){
        items.forEach((item) => {
            item.isActive = false;
        });
    }
    else {
        items.forEach((item) => {
            item.isActive = true;
        });
    }

    renderer.renderItems();
}

function checkFilter() {
    var filter = myStorage.getByKey('filter');
    if(filter != null){
        currentFilter.setFilter(filter);
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

document.getElementById('filter').addEventListener('click', function (event) {
    onFilterItemsByStatus(event.target.id);
});
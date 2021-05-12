function getItemsByStatus(status)
{
	let result = items.filter(item => item.isActive === status)
	renderItems(result);
}

function getAllItems()
{
	renderItems(items);
}
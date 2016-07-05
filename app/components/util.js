'use strict';

function byId(id) {
	return document.getElementById(id);
}

// utility function for returning the id of every data object
function returnKey(d) {
	return d.key;
}

module.exports = {
	byId: byId,
	returnKey: returnKey
};

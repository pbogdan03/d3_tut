'use strict';

function create1DDataset(numValues, range) {
	let data = [];
	for(let i = 0; i <= numValues; i++) {
		// use keys to setup the data ordering within the array
		// need it for removing specific data and updating the chart correctly
		data.push({
			key: i,
			value: Math.floor(Math.random() * range)
		});
	}
	return data;
}

function update1DDataset(dataset) {
	let maxValue = d3.max(dataset, (d) => d.value);
	for (let i = dataset.length - 1; i >= 0; i--) {
		dataset[i].value = Math.floor(Math.random() * maxValue);
	}
	return dataset;
}

function create2DDataset(numValues, xRange, yRange) {
	let data = [];
	for(let i = 0; i <= numValues; i++) {
		data.push([Math.floor(Math.random() * xRange), Math.floor(Math.random() * yRange)]);
	}
	return data;
}

module.exports = {
	create1DData: create1DDataset,
	create2DData: create2DDataset,
	update1DData: update1DDataset
};

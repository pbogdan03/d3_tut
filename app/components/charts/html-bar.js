'use strict';

import d3 from 'd3';
import _ from '../util';

function htmlBar(dataset, opts) {
	let colorScale = d3.scale.linear()
						 	 .domain([0, d3.max(dataset, (d) => d.value)])
						 	 .range([0, 180]);
	let heightScale = d3.scale.linear()
							  .domain([0, d3.max(dataset, (d) => d.value)])
							  .range([0, 500]);

	d3.select('.container').append('div').classed('standard-bar-container', true);
	d3.select('.standard-bar-container').append('h2').html('Standard HTML Bar');
	d3.select('.standard-bar-container').selectAll('div')
		.data(dataset, _.returnKey)
		.enter()
		.append('div')
		.classed('standard-bar', true)
		.style({
			'background-color': (d) => `hsl(${Math.ceil(colorScale(d.value))}, 100%, 50%)`,
			'height': (d) => `${heightScale(d.value)}px`,
			'margin-right': `${opts.barPadding}px`,
			'width': `${window.innerWidth / dataset.length - opts.barPadding}px`
		});
}

module.exports = htmlBar;


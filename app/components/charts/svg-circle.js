'use strict';

import d3 from 'd3';
import _ from '../util';

function svgCircle(dataset, opts) {
	d3.select('.container').append('div').classed('svg-circles-container', true);
	d3.select('.svg-circles-container').append('h2').html('SVG Circle Chart');

	let svg = d3.select('.svg-circles-container')
				.append('svg')
				.classed('svg-circles', true)
				.attr({
					'width': opts.w,
					'height': opts.h
				});
	let circles = svg.selectAll('circle')
					.data(dataset, _.returnKey)
					.enter()
					.append('circle');

	let rScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, (d) => d.value)])
						 .range([2, 25]);

	circles.attr('cx', function(d, i) {
				return (i * 50) + 25;
			})
			.attr({
				'cy': opts.h/2,
				'r': (d) => rScale(d.value),
				'fill': 'yellow',
				'stroke': 'orange',
				'stroke-width': (d) => rScale(d.value/5)
			});
}

module.exports = svgCircle;
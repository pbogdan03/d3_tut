'use strict';

import d3 from 'd3';
import _ from '../util';
import data from '../data';

function svgBar(dataset, opts) {
	d3.select('.container').append('div').classed('svg-bar-container', true);
	d3.select('.svg-bar-container').append('h2').html('SVG Bar Chart');
	d3.select('.svg-bar-container').append('button').classed('svg-bar--updateBtn', true).html('Update Chart');
	d3.select('.svg-bar-container').append('button').classed('svg-bar--addOne', true).html('Add one value');
	d3.select('.svg-bar-container').append('button').classed('svg-bar--removeOne', true).html('Remove one value');

	let duration = 1000;

	let svgBar = d3.select('.container')
					.append('svg')
					.classed('svg-bar', true)
					.attr({
						'width': opts.w,
						'height': opts.h
					});

	let xScale = d3.scale.ordinal()
						 .domain(d3.range(dataset.length))
						 .rangeRoundBands([0, window.innerWidth], 0.04); // rounds to exact value, introduces padding :(
	let yScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, (d) => d.value)])
						 .range([0, opts.h - 20]); // h - 20 to include the text label
	let colorScale = d3.scale.linear()
							 .domain([0, d3.max(dataset, (d) => d.value)])
							 .range([0, 200])
							 .clamp(true);

	svgBar.selectAll('rect')
		.data(dataset, _.returnKey)
		.enter()
		.append('rect')
		.attr({
			'x': (d, i) => xScale(i),
			'y': (d) => opts.h - yScale(d.value), // because the origin of SVG is top left
			'width': xScale.rangeBand(),
			'height': (d) => yScale(d.value),
			'fill': (d) => `rgb(${Math.round(colorScale(d.value))}, 100, 100)`
		});

	svgBar.selectAll('text')
		.data(dataset, _.returnKey)
		.enter()
		.append('text')
		.text((d) => d.value)
		.attr({
			'x': (d, i) => xScale(i) + xScale.rangeBand() / 2,
			'y': (d) => opts.h - yScale(d.value) - 5,
			'font-family': 'Helvetica, Arial, sans-serif',
			'font-size': '15px',
			'fill': '#333',
			'text-anchor': 'middle'
		});

	d3.select('.svg-bar--updateBtn')
		.on('click', () => {
			// settings
			dataset = data.update1DData(dataset);

			// update chart to fit in the svg total height
			// update color to fit in 255
			yScale.domain([0, d3.max(dataset, (d) => d.value)]);
			colorScale.domain([0, d3.max(dataset, (d) => d.value)]);

			// update chart bars from new dataset
			svgBar.selectAll('rect')
				.data(dataset, _.returnKey)
				.transition()
				.delay((d,i) => i / dataset.length * duration) // i / dataset.length normalizes the position
				.duration(duration)
				.attr({
					'y': (d) => opts.h - yScale(d.value),
					'height': (d) => yScale(d.value),
					'fill': (d) => `rgb(${Math.round(colorScale(d.value))}, 100, 100)`
				});
			// update chart labels from new dataset
			svgBar.selectAll('text')
				.data(dataset, _.returnKey)
				.transition()
				.delay((d,i) => i / dataset.length * duration)
				.duration(duration)
				.text((d) => d.value)
				.attr({
					'x': (d,i) => xScale(i) + xScale.rangeBand() / 2,
					'y': (d) => opts.h - yScale(d.value) - 5
				});
		});

	d3.select('.svg-bar--addOne')
		.on('click', () => {
			let newNumber = Math.floor(Math.random() * d3.max(dataset, (d) => d.value));
			dataset.push({key: d3.max(dataset, (d) => d.key) + 1, value: newNumber});

			xScale.domain(d3.range(dataset.length));

			// get a reference to the updated dataset
			let bars = svgBar.selectAll('rect')
				.data(dataset, _.returnKey);
			let labels = svgBar.selectAll('text')
				.data(dataset, _.returnKey);

			// enter gets the reference to the added element only
			// and creates and positions the new element
			bars.enter()
				.append('rect')
				.attr({
					'x': window.innerWidth,
					'y': (d) => opts.h - yScale(d.value),
					'width': xScale.rangeBand(),
					'height': (d) => yScale(d.value),
					'fill': (d) => `rgb(${Math.round(colorScale(d.value))}, 100, 100)`
				});
			labels.enter()
				.append('text')
				.text((d) => d.value)
				.attr({
				  	'x': window.innerWidth,
					'y': (d) => opts.h - yScale(d.value) - 5,
					'font-family': 'Helvetica, Arial, sans-serif',
					'font-size': '15px',
					'fill': '#333',
					'text-anchor': 'middle'
				});

			// updates the existing bar rects
			bars.transition()
				.duration(duration)
				.attr({
					'x': (d, i) => xScale(i),
					'y': (d) => opts.h - yScale(d.value),
					'width': xScale.rangeBand(),
					'height': (d) => yScale(d.value)
				});
			labels.transition()
				.duration(duration)
				.attr({
					'x': (d, i) => xScale(i) + xScale.rangeBand() / 2,
					'y': (d) => opts.h - yScale(d.value) - 5
				});
		});

	d3.select('.svg-bar--removeOne')
		.on('click', () => {
			dataset.shift();

			xScale.domain(d3.range(dataset.length));

			let bars = svgBar.selectAll('rect')
				.data(dataset, _.returnKey);
			let labels = svgBar.selectAll('text')
				.data(dataset, _.returnKey);

			bars.exit()
				.transition()
				.duration(duration)
				.attr('x', -xScale.rangeBand())
				.remove();
			labels.exit()
				.transition()
				.duration(duration)
				.attr('x', -xScale.rangeBand())
				.remove();

			bars.transition()
				.duration(duration)
				.attr({
					'x': (d, i) => xScale(i),
					'y': (d) => opts.h - yScale(d.value),
					'width': xScale.rangeBand(),
					'height': (d) => yScale(d.value)
				});
			labels.transition()
				.duration(duration)
				.attr({
					'x': (d, i) => xScale(i) + xScale.rangeBand() / 2,
					'y': (d) => opts.h - yScale(d.value) - 5
				});
		});
}

module.exports = svgBar;
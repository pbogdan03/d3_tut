'use strict';

import d3 from 'd3';
import _ from '../util';
import data from '../data';

function scatterPlot(dataset, opts) {
	d3.select('.container').append('div').classed('svg-scatter-container', true);
	d3.select('.svg-scatter-container').append('h2').html('SVG Scatter Plot');
	d3.select('.svg-scatter-container').append('button').classed('svg-scatter--updateBtn', true).html('Update Chart');

	let padding = 70;
	let svgScatter = d3.select('.svg-scatter-container')
					   .append('svg')
					   .classed('svg-scatter', true)
					   .attr({
					   		width: opts.w,
					   		height: opts.h
					   });

	let xScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, (d) => d[0])])
						 .range([padding, window.innerWidth - padding])
						 .clamp(true);
	let yScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, (d) => d[1])])
						 .range([opts.h - padding, padding]);
	let rScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, (d) => d[1])])
						 .range([2, 10]);

	let xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient('bottom')
					  .ticks(5);
	let yAxis = d3.svg.axis()
					  .scale(yScale)
					  .orient('left')
					  .ticks(5);
	//xAxis.tickFormat(d3.format(".1%")); //display axis text as 0.0%

	svgScatter.append('g')
		.attr({
			'id': 'circles',
			'clip-path': 'url(#chart-area)' // clipPath
		})
		.selectAll('circle')
		.data(dataset)
		.enter()
		.append('circle')
		.attr({
			'cx': (d) => xScale(d[0]),
			'cy': (d) => yScale(d[1]),
			'r': (d) => rScale(d[1])
		});

	svgScatter.append('clipPath')
		.attr('id', 'chart-area')
		.append('rect')
		.attr('x', padding)
		.attr('y', padding - 10) // don't cut the circles on the top of the chart (10px over the top)
		.attr('width', window.innerWidth - padding)
		.attr('height', opts.h - padding);	

	// svgScatter.selectAll('text')
	// 	.data(dataset3)
	// 	.enter()
	// 	.append('text')
	// 	.text((d) => d[0] + ',' + d[1])
	// 	.attr({
	// 		'x': (d) => xScale(d[0]),
	// 		'y': (d) => yScale(d[1]),
	// 		'font-family': 'Helvetica, Arial, sans-serif',
	// 		'font-size': '15px',
	// 		'fill': '#f00'
	// 	});

	// generate axis
	svgScatter.append('g')
			  .classed('x axis', true)
			  .attr('transform', `translate(0, ${opts.h - padding})`)
	   		  .call(xAxis);
	svgScatter.append('g')
			  .classed('y axis', true)
			  .attr('transform', `translate(${padding}, 0)`)
			  .call(yAxis);


	d3.select('.svg-scatter--updateBtn')
		.on('click', () => {
			dataset = data.create2DData(dataset.length, Math.floor(Math.random() * 2000), Math.floor(Math.random() * 2000));
			let duration = 500;

			xScale.domain([0, d3.max(dataset, (d) => d[0])]);
			yScale.domain([0, d3.max(dataset, (d) => d[1])]);
			rScale.domain([0, d3.max(dataset, (d) => d[1])]);

			svgScatter.selectAll('circle')
				.data(dataset)
				.transition()
				.duration(duration)
				.each('start', function() { // special function, 'this' context maintained, no es6
					d3.select(this)
						.attr({
							'fill': 'magenta'
						});
				})
				.attr({
					'cx': (d) => xScale(d[0]),
					'cy': (d) => yScale(d[1]),
					'r': (d) => rScale(d[1])
				})
				.transition()
				.duration(duration)
				.attr({
					'fill': 'black'
				});

			svgScatter.select('.x.axis')
				.transition()
				.duration(duration)
				.call(xAxis);

			svgScatter.select('.y.axis')
				.transition()
				.duration(duration)
				.call(yAxis);
		});
}

module.exports = scatterPlot;

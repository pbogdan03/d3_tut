'use strict';

import _ from '../util';

function canvasTest() {
	let canvasEl = document.createElement('canvas'),
		headerEl = document.createElement('h2'),
		containerEl = document.querySelector('.container');
	headerEl.innerHTML = 'Canvas';

	// test for older browsers that don't have canvas
	document.addEventListener ?
		document.addEventListener('DOMContentLoaded', onDOMContentLoaded) :
		window.onload = doCanvasNotSupported;

	function onDOMContentLoaded() {
		canvasEl.getContext ?
			doCanvas() :
			doCanvasNotSupported();
	}

	function doCanvas() {
		containerEl.appendChild(headerEl);

		createPalau(createCanvas(200, 125));
		createGreece(createCanvas(200, 125));
	}

	function doCanvasNotSupported() {
		containerEl.appendChild(headerEl);
		let noCanvasH3 = document.createElement('h3');
		noCanvasH3.innerHTML = 'Your browser does not support canvas.';
		containerEl.appendChild(noCanvasH3);
	}

	function createCanvas(w, h) {
		let canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		containerEl.appendChild(canvas);

		return canvas;
	}

	function createPalau(canvas) {
		let w = canvas.width,
			h = canvas.height,
			context = canvas.getContext('2d');

		context.fillStyle = '#4AADD6';
		context.fillRect(0, 0, w, h);

		context.fillStyle = '#FFDE00';
		context.arc(w/2.4, h/2, h/4, 0, 2 * Math.PI, false); // x,y, radius, degrees span, counterclockwise
		context.fill(); // draw the rectangle 
	}

	function createGreece(canvas) {
		let w = canvas.width,
			h = canvas.height,
			context = canvas.getContext('2d'),
			lineHeight = h / 9,
			offset = lineHeight / 2; // offset from line middle (half a line)

		context.fillStyle = '#000080';
		context.fillRect(0, 0, w, h);

		context.strokeStyle = '#fff';
		context.lineWidth = lineHeight;

		for (var i = 8; i > 1; i-=2) {
			context.moveTo(0, i * lineHeight - offset);
			context.lineTo(w, i * lineHeight - offset);
		}

		context.stroke(); // draw the lines
	}
}

module.exports = canvasTest;
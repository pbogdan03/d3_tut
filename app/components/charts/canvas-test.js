'use strict';

import _ from '../util';
import imgRef from '../../assets/index.png';

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
		createGuyana(createCanvas(200, 125));
		createBahrain(createCanvas(200, 125));
		createClock(createCanvas(200, 125));
		createIsrael(createCanvas(200, 125));
		createSomalia(createCanvas(200, 125));
		createTurkey(createCanvas(200, 125));
		createPieChart(createCanvas(200, 125));
		createQuadratic(createCanvas(200, 125));
		createBezier(createCanvas(200, 125));
		createHaiti(createCanvas(200, 125));
		createLinearGradient(createCanvas(200, 125));
		createFilteredText(createCanvas(200, 125));
		createPixels(createCanvas(200, 125));
		createClip(createCanvas(200, 125));
		createTransform2(createCanvas(200, 125));
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
		context.arc(w/2.4, h/2, h/3.6, 0, 2 * Math.PI, false); // x,y, radius, degrees span, counterclockwise
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
		context.beginPath(); // clear memory of previous lines, start from nothing

		let rw = lineHeight * 5;
		context.fillRect(0, 0, rw, rw); // draw top left rectangle

		context.moveTo(0, rw / 2);
		context.lineTo(rw, rw / 2); // draw horizontal line

		context.moveTo(rw / 2, 0);
		context.lineTo(rw / 2, rw); // draw vertical line

		context.stroke();
	}

	function createGuyana(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			gap = w / 25;
		
		ctx.fillStyle = '#009E49';
		ctx.fillRect(0, 0, w, h);

		fillTriangle(ctx, 0, 0, w, h/2, 0, h, '#fff');
		fillTriangle(ctx, 0, gap, w-3*gap, h/2, 0, h-gap, '#FCD116');
		fillTriangle(ctx, 0, 0, w/2, h/2, 0, h, '#000');
		fillTriangle(ctx, 0, gap, w/2 - 1.6*gap, h/2, 0, h-gap, '#CE1126');
	}

	function createBahrain(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			x = w / 4,
			xw = x / 2,
			yh = h / 5; // a quarter of the flag

		ctx.fillStyle = '#CE1126';
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.lineTo(x, 0);

		for (var i = 0; i < 5; i++) {
			ctx.lineTo(x + xw, (i+.5) * yh);
			ctx.lineTo(x, (i+1) * yh);	
		}

		ctx.lineTo(x, h);
		ctx.lineTo(0, h);
		ctx.lineTo(0, 0);

		ctx.fill();
	}

	function createClock(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			x = w / 2,
			y = h / 2,
			r = h / 3,
			date = new Date(),
			hour = date.getHours()%12,
			min = date.getMinutes(),
			sec = date.getSeconds(),
			dgr = Math.PI / 180,
			cdgr = 0;

		ctx.beginPath(); // to clear everything that was drawn before, from setTimeout
		ctx.fillStyle = '#FFE11A';
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = '#B5E655';
		ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		ctx.fill();

		ctx.strokeStyle = '#96CA2D';

		// SECONDS
		ctx.lineWidth = 1;
		ctx.beginPath();
		// subtract 90 dgr to get to 12 o'clock
		// 6 degrees per second
		cdgr = dgr * (-90 + sec * 6);
		ctx.moveTo(x, y);
		ctx.lineTo(x + Math.cos(cdgr) * r , y + Math.sin(cdgr) * r);
		ctx.stroke();

		ctx.strokeStyle = '#000';

		// MINUTES
		ctx.lineWidth = 2;
		ctx.beginPath();
		cdgr = dgr * (-90 + min * 6);
		ctx.moveTo(x, y);
		ctx.lineTo(x + Math.cos(cdgr) * r * 0.8 , y + Math.sin(cdgr) * r * 0.8); // 80% of the seconds line length
		ctx.stroke();

		// HOURS
		ctx.lineWidth = 4;
		ctx.beginPath();
		cdgr = dgr * (-90 + (hour + min / 60) * 30); // min / 60 offset for how many minutes have passed
		ctx.moveTo(x, y);
		ctx.lineTo(x + Math.cos(cdgr) * r * 0.5 , y + Math.sin(cdgr) * r * 0.5); // 80% of the seconds line length
		ctx.stroke();

		setTimeout(createClock, 1000, canvas);

	}

	function createIsrael(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			x = w / 2,
			y = h / 2,
			r = h / 4.7,
			pi = Math.PI,
			dgr = pi / 180,
			lw = r / 1.4;

		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, w, h);
		strokeTriangle(ctx, r / 5.5,
			x + Math.sin(0) * r, y + Math.cos(0) * r,
			x + Math.sin(dgr * 120) * r, y + Math.cos(dgr * 120) * r,
			x + Math.sin(dgr * 240) * r, y + Math.cos(dgr * 120) * r,
			"#0040C0"
		);
		strokeTriangle(ctx, r / 5.5,
			x + Math.sin(pi) * r, y + Math.cos(pi) * r,
			x + Math.sin(pi + dgr * 120) * r, y + Math.cos(pi + dgr * 120) * r,
			x + Math.sin(pi + dgr * 240) * r, y + Math.cos(pi + dgr * 120) * r,
			"#0040C0"
		);

		ctx.lineWidth = lw;
		ctx.beginPath();
		// top line
		ctx.moveTo(0, lw);
		ctx.lineTo(w, lw);

		// bottom line
		ctx.moveTo(0, h - lw);
		ctx.lineTo(w, h - lw);
		
		ctx.stroke();
	}

	function createSomalia(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d');

		ctx.fillStyle = '#4189DD';
		ctx.fillRect(0, 0, w, h);

		createStar(ctx, w / 2, h / 2, h / 13, h / 5, 5, '#fff', null, 0);		
	}

	function createTurkey(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			x = w / 2,
			y = h / 2,
			r = h / 4;

		ctx.fillStyle = '#E30A17';
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(x - r, y, r, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();

		r = Math.floor(r * 0.8);
		ctx.fillStyle = '#E30A17';
		ctx.beginPath();
		ctx.arc(x - r * 0.9, y, r, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();

		r = Math.floor(r * 0.75);
		createStar(ctx, x + r, y, r / 2.2, r, 5, '#fff', null, 15);
	}

	function createPieChart(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			x = w/2,
			y = h/2,
			r = h/4,
			rad = Math.PI/180;

		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, w, h);

		ctx.beginPath();
		ctx.fillStyle = '#F3F100';
		ctx.moveTo(x, y);
		ctx.arc(x, y, r, 40 * rad, 320 * rad, false);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = '#F3F100';
		ctx.moveTo(x + 10, y);
		ctx.arc(x + 10, y, r, 40 * rad, 320 * rad, true);
		ctx.lineTo(x + 10, y);
		ctx.closePath();
		ctx.fill();
	}

	function createQuadratic(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx= canvas.getContext('2d'),
			x = w/2,
			y = h/2;

		ctx.fillStyle = '#383388';
		ctx.fillRect(0, 0, w, h);

		ctx.lineWidth = 5;
		ctx.strokeStyle = '#383388';
		ctx.fillStyle = '#ffffff';

		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.quadraticCurveTo(x, 0, w, y);
		ctx.quadraticCurveTo(x, h, 0, y);
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.arc(x, y, x/5, 2 * Math.PI, false);
		ctx.closePath();
		ctx.stroke();
	}

	function createBezier(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			x = w/2,
			y = h/2;

		ctx.fillStyle = '#a3de00';
		ctx.fillRect(0, 0, w, h);

		ctx.lineWidth = 5;
		ctx.strokeStyle = '#a3de00';
		ctx.fillStyle = '#ffffff';

		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.bezierCurveTo(0, 0, w, 0, w, y);
		ctx.bezierCurveTo(w, h, 0, h, 0, y);
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.arc(x, y, x/5, 2 * Math.PI, false);
		ctx.closePath();
		ctx.stroke();
	}

	function createHaiti(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			x = w / 2,
			y = h / 2;

		ctx.fillStyle = '#00209F';
		ctx.fillRect(0, 0, w, y);

		ctx.fillStyle = '#D21034';
		ctx.fillRect(0, y, w, y);

		let img = new Image();
		img.onload = function() {
			let ratio = this.height / (h/4),
				iw = this.width / ratio + 10, //img is square
				ih = this.height / ratio;

			ctx.drawImage(this, x - iw / 2, y - ih / 2, iw, ih);
		};

		img.src = imgRef;
	}

	function createLinearGradient(canvas) {
		let w = canvas.width,
			h = canvas.height,
			x = w / 2,
			y = h / 2,
			ctx = canvas.getContext('2d'),
			point1,
			point2;

		ctx.fillStyle = '#aaaaaa';
		ctx.fillRect(0, 0, w, h);

		ctx.font = '14px arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = '#000';
		ctx.fillText('Click and drag for gradient', x, y);

		canvas.addEventListener('mousedown', (e) => {
			ctx.fillRect(0, 0, w, h);
			point1 = transformPos(canvas, e.clientX, e.clientY);
		});
		canvas.addEventListener('mouseup', (e) => {
			point2 = transformPos(canvas, e.clientX, e.clientY);

			let grad = ctx.createLinearGradient(point1.x, point1.y, point2.x, point2.y);
			grad.addColorStop(0, '#333933');
			grad.addColorStop(1, '#339333');

			ctx.fillStyle = grad;
			ctx.fillRect(0, 0, w, h);
		});
	}

	function createFilteredText(canvas) {
		let w = canvas.width,
			h = canvas.height,
			x = w / 2,
			y = h / 2,
			ctx = canvas.getContext('2d'),
			text = 'hello canvas',
			size = 48,
			tbox;

		do {
			ctx.font = size-- + 'px arial';
			tbox = ctx.measureText(text);
		} while(tbox.width > w * 0.9);

		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.strokeText(text, x, y);
		ctx.fillText(text, x - 2, y - 2);
	}

	function createPixels(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d');

		let img = new Image();
		img.onload = function() {
			ctx.drawImage(this, 0, 0, w, h);

			let imageData = ctx.getImageData(0, 0, w/2, h),
				pixelData = imageData.data;

			pixelData.forEach((el, i, arr) => {
				if(i % 4 !== 0) {
					arr[i] = 255 - el;
				}
			});
			ctx.putImageData(imageData, 0, 0);
		};

		img.src = imgRef;
	}

	function createClip(canvas) {
		let w = canvas.width,
			h = canvas.height,
			ctx = canvas.getContext('2d'),
			size = 20,
			iw = Math.ceil(w / size),
			ih = Math.ceil(h / size);

		ctx.fillStyle = '#aaa';
		ctx.fillRect(0,0,w,h);

		ctx.save(); // save the context state before clipping
		ctx.transform(1.2, 0.2, 0.2, 1.3, -30, 0); //hscale, hskew, vskew, vscale, hmove, vmove

		fillTriangle(ctx, 0, 0, w, h/2, 0, h, '#ff00aa');
		ctx.clip(); // clip using the existent shape - triangle

		ctx.beginPath();
		ctx.fillStyle = '#000';
		generatePattern(ctx, iw, ih, size, 0);
		ctx.closePath();
		ctx.fill();

		ctx.restore(); // restore the context state after clipping the black area and draw everywhere

		ctx.beginPath();
		ctx.fillStyle = '#fff';
		generatePattern(ctx, iw, ih, size, 1);
		ctx.closePath();
		ctx.fill();
	}

	function createTransform2(canvas) {
		let w = canvas.width,
			h = canvas.height,
			x = w/2,
			y = h/2,
			ctx = canvas.getContext('2d'),
			rad = Math.PI/180;

		ctx.fillStyle = '#aaa';
		ctx.fillRect(0, 0, w, h);

		ctx.save();

		ctx.font = 'bold 60px arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = '#000';

		ctx.translate(x, y); // moves the origin of the canvas
		ctx.fillText('Fin.', 0, 0);

		ctx.scale(.9, .9);
		ctx.rotate(rad * 5);
		ctx.fillStyle = '#ff0000';
		ctx.fillText('Fin.', 0, 0);

		ctx.scale(.9, .9);
		ctx.rotate(rad * 5);
		ctx.fillStyle = '#00ff00';
		ctx.fillText('Fin.', 0, 0);

		ctx.scale(.9, .9);
		ctx.rotate(rad * 5);
		ctx.fillStyle = '#0000ff';
		ctx.fillText('Fin.', 0, 0);

		ctx.restore();
		ctx.font = '20px arial';
		ctx.fillStyle = '#000';
		ctx.fillText('Boom', x, y + 40);
	}

	function generatePattern(ctx, w, h, size, offset) {
		for(let i = 0; i < w; i += 2) {
			for(let j = 0; j < h; j++) {
				ctx.rect((i + (j + offset) % 2) * size, j * size, size, size); //doesn't draw until calling context.fill()
			}
		}
	}

	function transformPos(canvas, clientX, clientY) { // returns the position relative to the canvas origin
		let rect = canvas.getBoundingClientRect();
		return {
			x: Math.round(clientX - rect.left),
			y: Math.round(clientY - rect.top)
		};
	}

	function fillTriangle(ctx, x1, y1, x2, y2, x3, y3, color) {
		ctx.fillStyle = color;

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.lineTo(x1, y1);
		ctx.closePath();

		ctx.fill();
	}

	function strokeTriangle(ctx, width, x1, y1, x2, y2, x3, y3, color) {
		ctx.strokeStyle = color;
		ctx.lineWidth = width;

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.lineTo(x1, y1);
		ctx.closePath();

		ctx.stroke();
	}

	function createStar(ctx, x, y, innerRad, outerRad, points, fillColor, strokeColor, tilt) {
		let dgr = Math.PI / 180,
			step = dgr * (360 / points) / 2,
			current = 0,
			radianTilt = dgr * tilt;

		ctx.beginPath();

		for (let i = points - 1; i >= 0; i--) {
			current += step;
			ctx.lineTo(x + Math.sin(current + radianTilt) * outerRad, y + Math.cos(current + radianTilt) * outerRad);

			current += step;
			ctx.lineTo(x + Math.sin(current + radianTilt) * innerRad, y + Math.cos(current + radianTilt) * innerRad);
		}

		ctx.closePath();

		if(fillColor) {
			ctx.fillStyle = fillColor;
			ctx.fill();
		}

		if(strokeColor) {
			ctx.strokeColor = strokeColor;
			ctx.stroke();
		}
	}
}

module.exports = canvasTest;
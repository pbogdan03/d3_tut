"use strict";

import d3 from 'd3';
import data from './data';
import htmlBar from './charts/html-bar';
import svgBar from './charts/svg-bar';
import svgCircle from './charts/svg-circle';
import scatterPlot from './charts/scatter-plot';
import canvasTest from './charts/canvas-test';

// CONSTANTS SETTINGS
const opts = {
	w : '100%',
	h : 500,
	barPadding : 2
};
const valueRange = 200;

// DATASETS
const dataset1D = data.create1DData(20, valueRange);
const dataset2D = data.create2DData(20, valueRange, valueRange);
const customData = data.customScatterData(20);

// CHARTS
svgBar(dataset1D, opts);
canvasTest();
htmlBar(dataset1D, opts);
svgCircle(dataset1D, opts);
scatterPlot(customData, opts);

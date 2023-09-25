/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var index;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/eventnode.ts":
/*!**************************!*\
  !*** ./src/eventnode.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EventNode = void 0;\nconst point_1 = __webpack_require__(/*! ./point */ \"./src/point.ts\");\nclass EventNode {\n    constructor(x, id) {\n        this.name = null;\n        this.isSelected = false;\n        this.parentIdentifier = id;\n        this.x = x;\n        this.name = `${EventNode.NODE_COUNTER++}`;\n    }\n    // Draw this node\n    draw(x, y, context) {\n        const oldStyle = {\n            lineWidth: context.lineWidth,\n            strokeStyle: context.strokeStyle,\n        };\n        context.lineWidth = 3;\n        context.strokeStyle = this.isSelected ? 'red' : 'blue';\n        context.beginPath();\n        context.arc(x, y, EventNode.RADIUS, 0, 2 * Math.PI);\n        context.stroke();\n        // draw the text\n        if (this.name !== null) {\n            this.drawText(x, y, this.name, context);\n        }\n        context.lineWidth = oldStyle.lineWidth;\n        context.strokeStyle = oldStyle.strokeStyle;\n    }\n    drawText(x, y, text, context) {\n        let fontSize = 26;\n        let width = 0;\n        do {\n            context.font = `${fontSize--}px \"Arial\", serif`;\n            width = context.measureText(text).width;\n        } while (width > EventNode.RADIUS * 2 - 6);\n        x -= width / 2;\n        context.fillText(text, Math.round(x), Math.round(y) + 6);\n    }\n    // Project the specified 'point' onto the node's circular outline. In other words, get the\n    // point on the circular outline which is closest to the specified 'point'.\n    getProjection(x, y, target) {\n        const dx = target.x - x;\n        const dy = target.y - y;\n        const magnitude = Math.sqrt(dx ** 2 + dy ** 2);\n        return new point_1.Point(this.x + EventNode.RADIUS * (dx / magnitude), y + EventNode.RADIUS * (dy / magnitude));\n    }\n}\nexports.EventNode = EventNode;\n// CLASS CONSTANTS\nEventNode.RADIUS = 30;\nEventNode.NODE_COUNTER = 1;\n\n\n//# sourceURL=webpack://happens-before-web/./src/eventnode.ts?");

/***/ }),

/***/ "./src/executionthread.ts":
/*!********************************!*\
  !*** ./src/executionthread.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ExecutionThread = void 0;\nconst eventnode_1 = __webpack_require__(/*! ./eventnode */ \"./src/eventnode.ts\");\nclass ExecutionThread {\n    constructor(identifier) {\n        this.y = 200;\n        this.identifier = identifier;\n        this.nodes = [];\n        // TODO: replace this\n        this.y *= this.identifier + 1;\n    }\n    draw(width, _height, context) {\n        const oldStyle = {\n            lineWidth: context.lineWidth,\n            strokeStyle: context.strokeStyle,\n        };\n        context.lineWidth = 4;\n        context.strokeStyle = 'gray';\n        const y = this.y;\n        context.beginPath();\n        context.moveTo(0, y);\n        for (const node of this.nodes) {\n            const x = node.x;\n            context.lineTo(x - eventnode_1.EventNode.RADIUS, this.y);\n            context.stroke();\n            node.draw(x, y, context);\n            context.beginPath();\n            context.moveTo(x + eventnode_1.EventNode.RADIUS, this.y);\n        }\n        context.lineTo(width, y);\n        context.stroke();\n        context.lineWidth = oldStyle.lineWidth;\n        context.strokeStyle = oldStyle.strokeStyle;\n    }\n    clear() {\n        this.nodes.length = 0;\n    }\n    tryAddEvent(x) {\n        if (this.nodes.some(node => Math.abs(x - node.x) < eventnode_1.EventNode.RADIUS * 1.2)) {\n            return 1;\n        }\n        this.addEvent(x);\n        return 0;\n    }\n    addEvent(x) {\n        this.nodes.push(new eventnode_1.EventNode(x, this.identifier));\n        // TODO: update this to be an efficient method\n        this.nodes.sort((a, b) => a.x - b.x);\n    }\n    containsPoint(p) {\n        return Math.abs(p.y - this.y) < eventnode_1.EventNode.RADIUS;\n    }\n    getNodeAt(p) {\n        if (!this.containsPoint(p)) {\n            return null;\n        }\n        // TODO: Use bin-search here\n        for (const node of this.nodes) {\n            if (Math.abs(node.x - p.x) < eventnode_1.EventNode.RADIUS) {\n                return node;\n            }\n        }\n        return null;\n    }\n}\nexports.ExecutionThread = ExecutionThread;\n\n\n//# sourceURL=webpack://happens-before-web/./src/executionthread.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst executionthread_1 = __webpack_require__(/*! ./executionthread */ \"./src/executionthread.ts\");\nconst relationlink_1 = __webpack_require__(/*! ./relationlink */ \"./src/relationlink.ts\");\nconst point_1 = __webpack_require__(/*! ./point */ \"./src/point.ts\");\nclass DrawingApp {\n    constructor() {\n        this.selected = null;\n        // EVENT HANDLERS\n        this.addThreadHandler = () => {\n            const nextId = this.threads.size;\n            this.threads.set(nextId, new executionthread_1.ExecutionThread(nextId));\n            this.redraw();\n        };\n        this.resetHandler = () => {\n            this.reset();\n            this.redraw();\n        };\n        this.resizeHandler = () => {\n            this.redraw();\n        };\n        this.doubleClickHandler = (event) => {\n            const mouseX = event.pageX;\n            const mouseY = event.pageY;\n            // Determine if we've clicked on anything\n            let minDistance = null;\n            let thread = null;\n            for (const currentThread of this.threads.values()) {\n                // The list of threads should be relatively short so iterating over it isn't expensive\n                const distance = Math.abs(currentThread.y - mouseY);\n                if (distance > DrawingApp.CLICK_RADIUS) {\n                    continue;\n                }\n                if (minDistance === null || distance < minDistance) {\n                    minDistance = distance;\n                    thread = currentThread;\n                }\n            }\n            if (thread === null) {\n                return;\n            }\n            // TODO: check if clicked on pre-existing node\n            if (!thread.tryAddEvent(mouseX)) {\n                this.redraw();\n            }\n        };\n        this.pressHandler = (event) => {\n            const mouseX = event.pageX;\n            const mouseY = event.pageY;\n            const clickPoint = new point_1.Point(mouseX, mouseY);\n            console.log(clickPoint);\n            let newSelection = null;\n            for (const thread of this.threads.values()) {\n                newSelection = thread.getNodeAt(clickPoint);\n                if (newSelection !== null) {\n                    break;\n                }\n            }\n            if (newSelection === null) {\n                if (this.selected !== null) {\n                    this.selected.isSelected = false;\n                    this.selected = null;\n                }\n                this.redraw();\n                return;\n            }\n            if (this.selected === null) {\n                newSelection.isSelected = true;\n                this.selected = newSelection;\n            }\n            else if (this.selected !== newSelection) {\n                this.selected.isSelected = false;\n                if (this.selected.parentIdentifier !== newSelection.parentIdentifier) {\n                    // TODO: prevent duplicate links\n                    this.links.push(new relationlink_1.RelationLink(this.selected, newSelection));\n                    newSelection.isSelected = false;\n                    this.selected = null;\n                }\n                else {\n                    newSelection.isSelected = true;\n                    this.selected = newSelection;\n                }\n            }\n            this.redraw();\n        };\n        this.canvas = document.getElementById('canvas');\n        this.context = this.canvas.getContext('2d');\n        // Set to default state\n        this.threads = new Map();\n        this.links = [];\n        this.reset();\n        // Hook up the event listeners\n        this.createUserEvents();\n        // Draw the thread\n        this.redraw();\n    }\n    getCanvasWidth() {\n        return this.canvas.width;\n    }\n    getCanvasHeight() {\n        return this.canvas.height;\n    }\n    createUserEvents() {\n        window.addEventListener('resize', this.resizeHandler);\n        const canvas = this.canvas;\n        canvas.addEventListener('dblclick', this.doubleClickHandler);\n        canvas.addEventListener('mousedown', this.pressHandler);\n        document\n            .getElementById('add_thread')\n            .addEventListener('click', this.addThreadHandler);\n        document\n            .getElementById('reset')\n            .addEventListener('click', this.resetHandler);\n    }\n    redraw() {\n        this.clearCanvas();\n        this.canvas.width = window.innerWidth;\n        this.canvas.height = window.innerHeight;\n        // Draw the threads\n        for (const thread of this.threads.values()) {\n            thread.draw(this.getCanvasWidth(), this.getCanvasHeight(), this.context);\n        }\n        // Draw the links\n        for (const link of this.links) {\n            const start = new point_1.Point(link.startEvent.x, this.threads.get(link.startEvent.parentIdentifier).y);\n            const end = new point_1.Point(link.endEvent.x, this.threads.get(link.endEvent.parentIdentifier).y);\n            const startProjection = link.startEvent.getProjection(start.x, start.y, end);\n            const endProjection = link.endEvent.getProjection(end.x, end.y, start);\n            link.draw(startProjection, endProjection, this.context);\n        }\n    }\n    reset() {\n        this.threads = new Map();\n        for (const num of [0, 1]) {\n            this.threads.set(num, new executionthread_1.ExecutionThread(num));\n        }\n        this.links = [];\n    }\n    clearCanvas() {\n        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        console.log('Cleared the canvas.');\n    }\n}\nDrawingApp.CLICK_RADIUS = 30;\nnew DrawingApp();\n\n\n//# sourceURL=webpack://happens-before-web/./src/index.ts?");

/***/ }),

/***/ "./src/point.ts":
/*!**********************!*\
  !*** ./src/point.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Point = void 0;\nclass Point {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    magnitude() {\n        return Math.sqrt(this.x ** 2 + this.y ** 2);\n    }\n    scale_to(magnitude) {\n        const size = this.magnitude();\n        return new Point((this.x / size) * magnitude, (this.y / size) * magnitude);\n    }\n    normalize() {\n        return this.scale_to(1);\n    }\n}\nexports.Point = Point;\n\n\n//# sourceURL=webpack://happens-before-web/./src/point.ts?");

/***/ }),

/***/ "./src/relationlink.ts":
/*!*****************************!*\
  !*** ./src/relationlink.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RelationLink = void 0;\nconst point_1 = __webpack_require__(/*! ./point */ \"./src/point.ts\");\nclass RelationLink {\n    constructor(startEvent, endEvent) {\n        this.startEvent = startEvent;\n        this.endEvent = endEvent;\n        console.log(`Created new link from ${startEvent.name} -> ${startEvent.name}`);\n    }\n    draw(start, end, context) {\n        if (Math.abs(this.startEvent.parentIdentifier - this.endEvent.parentIdentifier) > 1) {\n            console.log('Unimplemented - this link crosses through another thread of execution');\n            return;\n        }\n        this.drawArrow(start, end, context);\n    }\n    drawArrow(start, end, context) {\n        context.lineWidth = 3;\n        context.strokeStyle = 'black';\n        context.fillStyle = 'black';\n        // Line\n        context.beginPath();\n        context.moveTo(start.x, start.y);\n        context.lineTo(end.x, end.y);\n        context.stroke();\n        // Arrowhead\n        context.beginPath();\n        const radius = 10;\n        const scaled = new point_1.Point(end.x - start.x, end.y - start.y).scale_to(radius);\n        let angle = Math.atan2(end.y - start.y, end.x - start.x);\n        let x = radius * Math.cos(angle) + end.x - scaled.x;\n        let y = radius * Math.sin(angle) + end.y - scaled.y;\n        context.moveTo(x, y);\n        angle += this.degToRad(120);\n        x = radius * Math.cos(angle) + end.x - scaled.x;\n        y = radius * Math.sin(angle) + end.y - scaled.y;\n        context.lineTo(x, y);\n        angle += this.degToRad(120);\n        x = radius * Math.cos(angle) + end.x - scaled.x;\n        y = radius * Math.sin(angle) + end.y - scaled.y;\n        context.lineTo(x, y);\n        context.closePath();\n        context.fill();\n    }\n    degToRad(degrees) {\n        return degrees * (Math.PI / 180);\n    }\n}\nexports.RelationLink = RelationLink;\n\n\n//# sourceURL=webpack://happens-before-web/./src/relationlink.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	index = __webpack_exports__;
/******/ 	
/******/ })()
;
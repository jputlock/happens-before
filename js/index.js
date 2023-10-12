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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EventNode = void 0;\nconst point_1 = __webpack_require__(/*! ./point */ \"./src/point.ts\");\nclass EventNode {\n    static resetCounter() {\n        this.NODE_COUNTER = 1;\n    }\n    constructor(x, id, name = null) {\n        this.name = null;\n        this.isSelected = false;\n        this.parentIdentifier = id;\n        this.x = x;\n        this.name = name !== null ? name : `${EventNode.NODE_COUNTER++}`;\n    }\n    // Draw this node\n    draw(y, context) {\n        const x = this.x;\n        const oldStyle = {\n            lineWidth: context.lineWidth,\n            strokeStyle: context.strokeStyle,\n            fillStyle: context.fillStyle,\n        };\n        context.lineWidth = 3;\n        context.strokeStyle = this.isSelected ? 'red' : 'blue';\n        context.fillStyle = 'white';\n        // Filled circle\n        context.beginPath();\n        context.arc(x, y, EventNode.RADIUS, 0, 2 * Math.PI);\n        context.fill();\n        // Border circle\n        context.beginPath();\n        context.arc(x, y, EventNode.RADIUS, 0, 2 * Math.PI);\n        context.stroke();\n        // draw the text\n        if (this.name !== null) {\n            this.drawText(x, y, this.name, context);\n        }\n        context.lineWidth = oldStyle.lineWidth;\n        context.strokeStyle = oldStyle.strokeStyle;\n        context.fillStyle = oldStyle.fillStyle;\n    }\n    drawText(x, y, text, context) {\n        const oldFillStyle = context.fillStyle;\n        context.fillStyle = 'black';\n        let fontSize = 26;\n        let width = 0;\n        do {\n            context.font = `${fontSize--}px \"Arial\", serif`;\n            width = context.measureText(text).width;\n        } while (width > EventNode.RADIUS * 2 - 6);\n        x -= width / 2;\n        context.fillText(text, Math.round(x), Math.round(y) + 6);\n        context.fillStyle = oldFillStyle;\n    }\n    // Project the specified 'point' onto the node's circular outline. In other words, get the\n    // point on the circular outline which is closest to the specified 'point'.\n    getProjection(x, y, target) {\n        const dx = target.x - x;\n        const dy = target.y - y;\n        const magnitude = Math.sqrt(dx ** 2 + dy ** 2);\n        return new point_1.Point(this.x + EventNode.RADIUS * (dx / magnitude), y + EventNode.RADIUS * (dy / magnitude));\n    }\n}\nexports.EventNode = EventNode;\n// CLASS CONSTANTS\nEventNode.RADIUS = 30;\nEventNode.NODE_COUNTER = 1;\n\n\n//# sourceURL=webpack://happens-before-web/./src/eventnode.ts?");

/***/ }),

/***/ "./src/executionthread.ts":
/*!********************************!*\
  !*** ./src/executionthread.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ExecutionThread = void 0;\nconst eventnode_1 = __webpack_require__(/*! ./eventnode */ \"./src/eventnode.ts\");\nclass ExecutionThread {\n    constructor(identifier) {\n        this.y = 200;\n        this.identifier = identifier;\n        this.nodes = [];\n        // TODO: replace this\n        this.y *= this.identifier + 1;\n    }\n    draw(width, _height, context) {\n        const oldStyle = {\n            lineWidth: context.lineWidth,\n            strokeStyle: context.strokeStyle,\n        };\n        context.lineWidth = 4;\n        context.strokeStyle = 'gray';\n        const y = this.y;\n        context.beginPath();\n        context.moveTo(0, y);\n        context.lineTo(width, y);\n        context.stroke();\n        for (const node of this.nodes) {\n            node.draw(y, context);\n        }\n        context.lineWidth = oldStyle.lineWidth;\n        context.strokeStyle = oldStyle.strokeStyle;\n    }\n    clear() {\n        this.nodes.length = 0;\n    }\n    tryAddNode(x, name = null) {\n        if (this.nodes.some(node => Math.abs(x - node.x) < eventnode_1.EventNode.RADIUS * 1.2)) {\n            return false;\n        }\n        return this.addNode(x, name);\n    }\n    insertNode(node) {\n        this.nodes.push(node);\n        // TODO: update this to be an efficient method\n        this.nodes.sort((a, b) => a.x - b.x);\n    }\n    removeNode(target) {\n        const index = this.nodes.findIndex(node => node === target);\n        if (index === -1) {\n            console.log(\"Trying to remove node that doesn't exist in thread\");\n            return;\n        }\n        this.nodes.splice(index, 1);\n    }\n    addNode(x, name = null) {\n        const node = new eventnode_1.EventNode(x, this.identifier, name);\n        this.nodes.push(node);\n        // TODO: update this to be an efficient method\n        this.nodes.sort((a, b) => a.x - b.x);\n        return node;\n    }\n    containsPoint(p) {\n        return Math.abs(p.y - this.y) < eventnode_1.EventNode.RADIUS;\n    }\n    getNodeAt(p) {\n        if (!this.containsPoint(p)) {\n            return null;\n        }\n        // TODO: Use bin-search here\n        for (const node of this.nodes) {\n            if (Math.abs(node.x - p.x) < eventnode_1.EventNode.RADIUS) {\n                return node;\n            }\n        }\n        return null;\n    }\n}\nexports.ExecutionThread = ExecutionThread;\n\n\n//# sourceURL=webpack://happens-before-web/./src/executionthread.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst executionthread_1 = __webpack_require__(/*! ./executionthread */ \"./src/executionthread.ts\");\nconst eventnode_1 = __webpack_require__(/*! ./eventnode */ \"./src/eventnode.ts\");\nconst relationlink_1 = __webpack_require__(/*! ./relationlink */ \"./src/relationlink.ts\");\nconst point_1 = __webpack_require__(/*! ./point */ \"./src/point.ts\");\nclass DrawingApp {\n    constructor() {\n        this.selected = null;\n        this.dragging = false;\n        this.holdingShift = false;\n        // EVENT HANDLERS\n        this.addThreadHandler = () => {\n            const nextId = this.threads.size;\n            const newThread = new executionthread_1.ExecutionThread(nextId);\n            this.threads.set(nextId, newThread);\n            if (newThread.y > this.canvas.height) {\n                this.canvas.height = newThread.y + 200;\n            }\n            this.redraw();\n        };\n        this.resetHandler = () => {\n            this.reset();\n            this.redraw();\n        };\n        this.resizeHandler = () => {\n            this.redraw();\n        };\n        this.doubleClickHandler = (event) => {\n            const mouseX = event.offsetX;\n            const mouseY = event.offsetY;\n            console.log(mouseX, mouseY);\n            const thread = this.getNearestThread(mouseY);\n            if (thread === null) {\n                return;\n            }\n            if (thread.tryAddNode(mouseX) !== false) {\n                this.redraw();\n            }\n        };\n        this.mouseDownHandler = (event) => {\n            const mouseX = event.pageX;\n            const mouseY = event.pageY;\n            const clickPoint = new point_1.Point(mouseX, mouseY);\n            let newSelection = null;\n            for (const thread of this.threads.values()) {\n                newSelection = thread.getNodeAt(clickPoint);\n                if (newSelection !== null) {\n                    break;\n                }\n            }\n            if (newSelection === null) {\n                if (this.selected !== null) {\n                    this.selected.isSelected = false;\n                    this.selected = null;\n                }\n                this.redraw();\n                return;\n            }\n            if (this.selected === null) {\n                newSelection.isSelected = true;\n                this.selected = newSelection;\n            }\n            else if (this.selected !== newSelection) {\n                this.selected.isSelected = false;\n                if (this.holdingShift &&\n                    this.selected.parentIdentifier !== newSelection.parentIdentifier) {\n                    // TODO: prevent duplicate links\n                    this.links.push(new relationlink_1.RelationLink(this.selected, newSelection));\n                    newSelection.isSelected = false;\n                    this.selected = null;\n                }\n                else {\n                    newSelection.isSelected = true;\n                    this.selected = newSelection;\n                }\n            }\n            this.dragging = true;\n            this.redraw();\n        };\n        this.mouseMoveHandler = (event) => {\n            if (!this.dragging || !this.selected || this.holdingShift) {\n                return;\n            }\n            // Move the node horizontally with the mouse\n            const mouseX = event.pageX;\n            this.selected.x = mouseX;\n            // Snap the node to the thread the mouse is nearest to\n            const mouseY = event.pageY;\n            let thread = this.getNearestThread(mouseY);\n            if (thread !== null &&\n                thread.identifier !== this.selected.parentIdentifier) {\n                // Need to move threads\n                const oldThread = this.threads.get(this.selected.parentIdentifier);\n                oldThread.removeNode(this.selected);\n                thread.insertNode(this.selected);\n                this.selected.parentIdentifier = thread.identifier;\n            }\n            if (thread === null) {\n                thread = this.threads.get(this.selected.parentIdentifier);\n            }\n            this.redraw();\n        };\n        // eslint-disable-next-line @typescript-eslint/no-unused-vars\n        this.mouseUpHandler = (event) => {\n            this.dragging = false;\n        };\n        this.keyDownHandler = (event) => {\n            const keyCode = event.code;\n            if (keyCode === 'Escape') {\n                if (this.selected !== null) {\n                    this.selected.isSelected = false;\n                }\n                this.selected = null;\n                this.redraw();\n            }\n            else if (keyCode.includes('Shift')) {\n                this.holdingShift = true;\n            }\n        };\n        this.keyUpHandler = (event) => {\n            const keyCode = event.code;\n            if (keyCode.includes('Shift')) {\n                this.holdingShift = false;\n            }\n        };\n        this.canvas = document.getElementById('canvas');\n        this.context = this.canvas.getContext('2d');\n        this.canvas.width = this.canvas.offsetWidth;\n        // this.canvas.height = this.canvas.offsetHeight * 0.8;\n        // Set to default state\n        this.threads = new Map();\n        this.links = [];\n        this.reset();\n        // Hook up the event listeners\n        this.createUserEvents();\n        // Draw the thread\n        this.redraw();\n    }\n    createUserEvents() {\n        window.addEventListener('resize', this.resizeHandler);\n        const canvas = this.canvas;\n        canvas.addEventListener('dblclick', this.doubleClickHandler);\n        canvas.addEventListener('mousedown', this.mouseDownHandler);\n        canvas.addEventListener('mousemove', this.mouseMoveHandler);\n        canvas.addEventListener('mouseup', this.mouseUpHandler);\n        window.addEventListener('keydown', this.keyDownHandler);\n        window.addEventListener('keyup', this.keyUpHandler);\n        document\n            .getElementById('add_thread')\n            .addEventListener('click', this.addThreadHandler);\n        document\n            .getElementById('reset')\n            .addEventListener('click', this.resetHandler);\n    }\n    redraw() {\n        this.clearCanvas();\n        // Draw the threads\n        for (const thread of this.threads.values()) {\n            thread.draw(this.canvas.width, this.canvas.height, this.context);\n        }\n        // Draw the links\n        for (const link of this.links) {\n            const start = new point_1.Point(link.startEvent.x, this.threads.get(link.startEvent.parentIdentifier).y);\n            const end = new point_1.Point(link.endEvent.x, this.threads.get(link.endEvent.parentIdentifier).y);\n            const startProjection = link.startEvent.getProjection(start.x, start.y, end);\n            const endProjection = link.endEvent.getProjection(end.x, end.y, start);\n            link.draw(startProjection, endProjection, this.context);\n        }\n    }\n    reset() {\n        this.threads = new Map();\n        for (const num of [0, 1]) {\n            this.threads.set(num, new executionthread_1.ExecutionThread(num));\n        }\n        this.canvas.height = 2 * 0.8 * window.outerHeight;\n        this.links = [];\n        eventnode_1.EventNode.resetCounter();\n    }\n    clearCanvas() {\n        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    }\n    getNearestThread(y) {\n        let minDistance = null;\n        let thread = null;\n        for (const currentThread of this.threads.values()) {\n            // The list of threads should be relatively short so iterating over it isn't expensive\n            const distance = Math.abs(currentThread.y - y);\n            if (distance > DrawingApp.CLICK_RADIUS) {\n                continue;\n            }\n            if (minDistance === null || distance < minDistance) {\n                minDistance = distance;\n                thread = currentThread;\n            }\n        }\n        return thread;\n    }\n}\nDrawingApp.CLICK_RADIUS = 30;\nnew DrawingApp();\n\n\n//# sourceURL=webpack://happens-before-web/./src/index.ts?");

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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RelationLink = void 0;\nconst point_1 = __webpack_require__(/*! ./point */ \"./src/point.ts\");\nclass RelationLink {\n    constructor(startEvent, endEvent) {\n        this.startEvent = startEvent;\n        this.endEvent = endEvent;\n        console.log(`Created new link from ${startEvent.name} -> ${endEvent.name}`);\n    }\n    draw(start, end, context) {\n        this.drawArrow(start, end, context);\n    }\n    drawArrow(start, end, context) {\n        context.lineWidth = 3;\n        context.strokeStyle = 'black';\n        context.fillStyle = 'black';\n        // Line\n        context.beginPath();\n        context.moveTo(start.x, start.y);\n        context.lineTo(end.x, end.y);\n        context.stroke();\n        // Arrowhead\n        context.beginPath();\n        const radius = 10;\n        const scaled = new point_1.Point(end.x - start.x, end.y - start.y).scale_to(radius);\n        let angle = Math.atan2(end.y - start.y, end.x - start.x);\n        let x = radius * Math.cos(angle) + end.x - scaled.x;\n        let y = radius * Math.sin(angle) + end.y - scaled.y;\n        context.moveTo(x, y);\n        angle += this.degToRad(120);\n        x = radius * Math.cos(angle) + end.x - scaled.x;\n        y = radius * Math.sin(angle) + end.y - scaled.y;\n        context.lineTo(x, y);\n        angle += this.degToRad(120);\n        x = radius * Math.cos(angle) + end.x - scaled.x;\n        y = radius * Math.sin(angle) + end.y - scaled.y;\n        context.lineTo(x, y);\n        context.closePath();\n        context.fill();\n    }\n    degToRad(degrees) {\n        return degrees * (Math.PI / 180);\n    }\n}\nexports.RelationLink = RelationLink;\n\n\n//# sourceURL=webpack://happens-before-web/./src/relationlink.ts?");

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
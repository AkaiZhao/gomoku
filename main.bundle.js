/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chess.ts":
/*!**********************!*\
  !*** ./src/chess.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    function default_1(context) {
        this.data = [];
        this.isWhite = false;
        this.winner = 0;
        this.undoCount = 0;
        this.context = context;
        this.createNewGame();
    }
    /**
     * 開始新遊戲
     */
    default_1.prototype.createNewGame = function () {
        for (var x = 0; x < 15; x++) {
            this.data[x] = [];
            for (var y = 0; y < 15; y++) {
                this.data[x][y] = 0;
            }
        }
        this.isWhite = false;
        this.winner = 0;
        this.lastChess = null;
    };
    /**
     * 悔棋
     */
    default_1.prototype.undo = function () {
        if (!this.lastChess || this.undoCount == 1)
            return;
        this.undoCount++;
        var _a = this.lastChess, x = _a.x, y = _a.y;
        this.isWhite = !this.isWhite;
        this.data[x][y] = 0;
        this.lastChess = this.lastTwoChess;
        this.lastTwoChess = null;
    };
    /**
     * 下棋
     */
    default_1.prototype.play = function (_a) {
        var e = _a.e, offset = _a.offset;
        if (this.winner)
            return;
        var _b = this.calcPosition({ e: e, offset: offset }), x = _b.x, y = _b.y, px = _b.px, py = _b.py;
        if (x >= 15 || x < 0 || y >= 15 || y < 0 || this.data[x][y] != 0)
            return;
        if (this.lastChess)
            this.lastTwoChess = this.lastChess;
        this.lastChess = { x: x, y: y, px: px, py: py };
        if (this.isWhite) {
            this.data[x][y] = -1;
            this.drawChess({ x: x, y: y, c: this.data[x][y] });
            this.isWhite = false;
        }
        else {
            this.data[x][y] = 1;
            this.drawChess({ x: x, y: y, c: this.data[x][y] });
            this.isWhite = true;
        }
        this.undoCount = 0;
        this.judgement({ x: x, y: y, c: this.data[x][y] });
        this.refresh();
    };
    /**
     * 重整棋盤
     */
    default_1.prototype.refresh = function () {
        for (var x = 0; x < this.data.length; x++) {
            for (var y = 0; y < this.data.length; y++) {
                this.drawChess({ x: x, y: y, c: this.data[x][y] });
                this.mark();
            }
        }
    };
    /**
     * 滑鼠特效
     */
    default_1.prototype.hover = function (_a) {
        var e = _a.e, offset = _a.offset;
        if (this.winner)
            return;
        var _b = this.calcPosition({ e: e, offset: offset }), px = _b.px, py = _b.py;
        this.drawBlock(px, py);
    };
    /**
     * 計算位置
     * @param e 滑鼠事件
     * @param offset 螢幕間隔
     */
    default_1.prototype.calcPosition = function (_a) {
        var e = _a.e, offset = _a.offset;
        var x = Math.round((e.clientX - offset.left - 20) / 40);
        var y = Math.round((e.clientY - offset.top - 20) / 40);
        var px = 20 + x * 40;
        var py = 20 + y * 40;
        return { x: x, y: y, px: px, py: py };
    };
    /**
     *  將棋子畫到畫布上
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} c 棋子顏色
     */
    default_1.prototype.drawChess = function (_a) {
        var x = _a.x, y = _a.y, c = _a.c;
        var rx = 20 + x * 40, ry = 20 + y * 40, r = 15, pi = 2 * Math.PI;
        this.context.beginPath();
        this.context.arc(rx, ry, r, 0, pi);
        this.context.closePath();
        var gradient = this.context.createRadialGradient(rx + 2, ry - 2, r, rx + 2, ry + 2, 0);
        if (c === 1) {
            gradient.addColorStop(0, '#0A0A0A');
            gradient.addColorStop(1, '#636766');
        }
        else if (c === -1) {
            gradient.addColorStop(0, '#D1D1D1');
            gradient.addColorStop(1, '#F9F9F9');
        }
        this.context.fillStyle = gradient;
        this.context.fill();
    };
    /**
     * 計算輸贏結果
     * @param {number} x 座標X軸
     * @param {number} y 座標Y軸
     * @param {number} c 棋子顏色(1or-1)
     */
    default_1.prototype.judgement = function (_a) {
        var x = _a.x, y = _a.y, c = _a.c;
        var row = { count: -1, bright: false, bleft: false };
        var col = { count: -1, bright: false, bleft: false };
        var ltrb = { count: -1, bright: false, bleft: false };
        var rtlb = { count: -1, bright: false, bleft: false };
        for (var i = 0; i < 5; i++) {
            // 水平
            if (this.data[x + i] && !row.bright) {
                if (this.data[x + i][y] == c)
                    row.count++;
                else
                    row.bright = true;
            }
            if (this.data[x - i] && !row.bleft) {
                if (this.data[x - i][y] === c)
                    row.count++;
                else
                    row.bleft = true;
            }
            // 垂直
            if (this.data[y + i] && !col.bright) {
                if (this.data[x][y + i] == c)
                    col.count++;
                else
                    col.bright = true;
            }
            if (this.data[y - i] && !col.bleft) {
                if (this.data[x][y - i] === c)
                    col.count++;
                else
                    col.bleft = true;
            }
            // 左上右下
            if (this.data[x + i] && this.data[y + i] && !ltrb.bright) {
                if (this.data[x + i][y + i] == c)
                    ltrb.count++;
                else
                    ltrb.bright = true;
            }
            if (this.data[x - i] && this.data[y - i] && !ltrb.bleft) {
                if (this.data[x - i][y - i] === c)
                    ltrb.count++;
                else
                    ltrb.bleft = true;
            }
            // 右上左下
            if (this.data[x + i] && this.data[y - i] && !rtlb.bright) {
                if (this.data[x + i][y - i] == c)
                    rtlb.count++;
                else
                    rtlb.bright = true;
            }
            if (this.data[x - i] && this.data[y + i] && !rtlb.bleft) {
                if (this.data[x - i][y + i] === c)
                    rtlb.count++;
                else
                    rtlb.bleft = true;
            }
        }
        if (row.count >= 5 ||
            col.count >= 5 ||
            ltrb.count >= 5 ||
            rtlb.count >= 5) {
            this.winner = c;
        }
    };
    /**
     * 在棋子上標記紅點
     */
    default_1.prototype.mark = function () {
        if (!this.lastChess)
            return;
        var _a = this.lastChess, px = _a.px, py = _a.py;
        this.context.fillStyle = 'red';
        this.context.beginPath();
        this.context.fillRect(px - 2.5, py - 2.5, 5, 5);
        this.context.closePath();
    };
    /**
     * 滑入的時候繪製方塊
     * @param px X軸位置
     * @param py Y軸位置
     */
    default_1.prototype.drawBlock = function (px, py) {
        if (this.isWhite)
            this.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        else
            this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.context.beginPath();
        this.context.fillRect(px - 20, py - 20, 40, 40);
        this.context.closePath();
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/drawMap.ts":
/*!************************!*\
  !*** ./src/drawMap.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    function default_1(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.inital();
    }
    /**
     *  初始化棋盤
     */
    default_1.prototype.inital = function () {
        this.clearBoard();
        this.drawBoard();
    };
    /**
     * 清除棋盤
     */
    default_1.prototype.clearBoard = function () {
        this.context = this.canvas.getContext('2d');
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#845c3b';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    /**
     * 繪製棋盤
     */
    default_1.prototype.drawBoard = function () {
        for (var i = 20; i < this.canvas.height; i += 40) {
            this.context.strokeStyle = '#000';
            this.context.beginPath();
            this.context.moveTo(20, i);
            this.context.lineTo(this.canvas.height - 20, i);
            this.context.moveTo(i, 20);
            this.context.lineTo(i, this.canvas.height - 20);
            this.context.closePath();
            this.context.stroke();
        }
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drawMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawMap */ "./src/drawMap.ts");
/* harmony import */ var _chess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chess */ "./src/chess.ts");


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var drawMap = new _drawMap__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, context);
var chess = new _chess__WEBPACK_IMPORTED_MODULE_1__["default"](context);
canvas.addEventListener('click', function (e) {
    chess.play({ e: e, offset: canvas.getBoundingClientRect() });
    if (chess.winner)
        document.getElementById('title').innerText =
            chess.winner == 1 ? 'BLACK WIN' : 'WHITE WIN';
});
window.addEventListener('keyup', function (e) {
    drawMap.inital();
    chess.refresh();
});
function refresh(e) {
    drawMap.inital();
    chess.refresh();
    chess.hover({ e: e, offset: canvas.getBoundingClientRect() });
}
canvas.addEventListener('mousemove', function (e) {
    refresh(e);
});
var restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('title').innerText = 'GOMOKU';
    drawMap.inital();
    chess.createNewGame();
});
var undoBtn = document.getElementById('undo');
undoBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (chess.winner)
        return;
    chess.undo();
    drawMap.inital();
    chess.refresh();
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoZXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9kcmF3TWFwLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7SUFRRSxtQkFBWSxPQUFpQztRQVByQyxTQUFJLEdBQWUsRUFBRSxDQUFDO1FBQ3RCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUdsQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxpQ0FBYSxHQUFwQjtRQUNFLEtB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Y0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWpFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBQztJQUNwQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQ3RELE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQixLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFDSCxJQUFJLE9BQU8sR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQUM7SUFDakMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLElBQUksS0FBSyxDQUFDLE1BQU07UUFBRSxPQUFPO0lBQ3pCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgcHJpdmF0ZSBkYXRhOiBudW1iZXJbXVtdID0gW107XG4gIHByaXZhdGUgaXNXaGl0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHVibGljIHdpbm5lcjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBsYXN0Q2hlc3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IHB4OiBudW1iZXI7IHB5OiBudW1iZXIgfTtcbiAgcHJpdmF0ZSBsYXN0VHdvQ2hlc3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IHB4OiBudW1iZXI7IHB5OiBudW1iZXIgfTtcbiAgcHJpdmF0ZSB1bmRvQ291bnQ6IG51bWJlciA9IDA7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5jcmVhdGVOZXdHYW1lKCk7XG4gIH1cblxuICAvKipcbiAgICog6ZaL5aeL5paw6YGK5oiyXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTmV3R2FtZSgpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDE1OyB4KyspIHtcbiAgICAgIHRoaXMuZGF0YVt4XSA9IFtdO1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxNTsgeSsrKSB7XG4gICAgICAgIHRoaXMuZGF0YVt4XVt5XSA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaXNXaGl0ZSA9IGZhbHNlO1xuICAgIHRoaXMud2lubmVyID0gMDtcbiAgICB0aGlzLmxhc3RDaGVzcyA9IG51bGw7XG4gIH1cbiAgLyoqXG4gICAqIOaClOaji1xuICAgKi9cbiAgcHVibGljIHVuZG8oKSB7XG4gICAgaWYgKCF0aGlzLmxhc3RDaGVzcyB8fCB0aGlzLnVuZG9Db3VudCA9PSAxKSByZXR1cm47XG4gICAgdGhpcy51bmRvQ291bnQrKztcbiAgICBsZXQgeyB4LCB5IH0gPSB0aGlzLmxhc3RDaGVzcztcbiAgICB0aGlzLmlzV2hpdGUgPSAhdGhpcy5pc1doaXRlO1xuICAgIHRoaXMuZGF0YVt4XVt5XSA9IDA7XG4gICAgdGhpcy5sYXN0Q2hlc3MgPSB0aGlzLmxhc3RUd29DaGVzcztcbiAgICB0aGlzLmxhc3RUd29DaGVzcyA9IG51bGw7XG4gIH1cbiAgLyoqXG4gICAqIOS4i+aji1xuICAgKi9cbiAgcHVibGljIHBsYXkoeyBlLCBvZmZzZXQgfTogV2luZG93RGF0YSkge1xuICAgIGlmICh0aGlzLndpbm5lcikgcmV0dXJuO1xuICAgIGxldCB7IHgsIHksIHB4LCBweSB9ID0gdGhpcy5jYWxjUG9zaXRpb24oeyBlLCBvZmZzZXQgfSk7XG4gICAgaWYgKHggPj0gMTUgfHwgeCA8IDAgfHwgeSA+PSAxNSB8fCB5IDwgMCB8fCB0aGlzLmRhdGFbeF1beV0gIT0gMCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmxhc3RDaGVzcykgdGhpcy5sYXN0VHdvQ2hlc3MgPSB0aGlzLmxhc3RDaGVzcztcbiAgICB0aGlzLmxhc3RDaGVzcyA9IHsgeCwgeSwgcHgsIHB5IH07XG4gICAgaWYgKHRoaXMuaXNXaGl0ZSkge1xuICAgICAgdGhpcy5kYXRhW3hdW3ldID0gLTE7XG4gICAgICB0aGlzLmRyYXdDaGVzcyh7IHgsIHksIGM6IHRoaXMuZGF0YVt4XVt5XSB9KTtcbiAgICAgIHRoaXMuaXNXaGl0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGFbeF1beV0gPSAxO1xuICAgICAgdGhpcy5kcmF3Q2hlc3MoeyB4LCB5LCBjOiB0aGlzLmRhdGFbeF1beV0gfSk7XG4gICAgICB0aGlzLmlzV2hpdGUgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLnVuZG9Db3VudCA9IDA7XG4gICAgdGhpcy5qdWRnZW1lbnQoeyB4LCB5LCBjOiB0aGlzLmRhdGFbeF1beV0gfSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cbiAgLyoqXG4gICAqIOmHjeaVtOaji+ebpFxuICAgKi9cbiAgcHVibGljIHJlZnJlc2goKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmRhdGEubGVuZ3RoOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5kYXRhLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIHRoaXMuZHJhd0NoZXNzKHsgeCwgeSwgYzogdGhpcy5kYXRhW3hdW3ldIH0pO1xuICAgICAgICB0aGlzLm1hcmsoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOa7kem8oOeJueaViFxuICAgKi9cbiAgcHVibGljIGhvdmVyKHsgZSwgb2Zmc2V0IH06IFdpbmRvd0RhdGEpIHtcbiAgICBpZiAodGhpcy53aW5uZXIpIHJldHVybjtcbiAgICBsZXQgeyBweCwgcHkgfSA9IHRoaXMuY2FsY1Bvc2l0aW9uKHsgZSwgb2Zmc2V0IH0pO1xuICAgIHRoaXMuZHJhd0Jsb2NrKHB4LCBweSk7XG4gIH1cbiAgLyoqXG4gICAqIOioiOeul+S9jee9rlxuICAgKiBAcGFyYW0gZSDmu5HpvKDkuovku7ZcbiAgICogQHBhcmFtIG9mZnNldCDonqLluZXplpPpmpRcbiAgICovXG4gIHByaXZhdGUgY2FsY1Bvc2l0aW9uKHtcbiAgICBlLFxuICAgIG9mZnNldFxuICB9OiBXaW5kb3dEYXRhKTogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgcHg6IG51bWJlcjsgcHk6IG51bWJlciB9IHtcbiAgICBsZXQgeDogbnVtYmVyID0gTWF0aC5yb3VuZCgoZS5jbGllbnRYIC0gb2Zmc2V0LmxlZnQgLSAyMCkgLyA0MCk7XG4gICAgbGV0IHk6IG51bWJlciA9IE1hdGgucm91bmQoKGUuY2xpZW50WSAtIG9mZnNldC50b3AgLSAyMCkgLyA0MCk7XG4gICAgbGV0IHB4OiBudW1iZXIgPSAyMCArIHggKiA0MDtcbiAgICBsZXQgcHk6IG51bWJlciA9IDIwICsgeSAqIDQwO1xuICAgIHJldHVybiB7IHgsIHksIHB4LCBweSB9O1xuICB9XG4gIC8qKlxuICAgKiAg5bCH5qOL5a2Q55Wr5Yiw55Wr5biD5LiKXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFjluqfmqJlcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgWeW6p+aomVxuICAgKiBAcGFyYW0ge251bWJlcn0gYyDmo4vlrZDpoY/oibJcbiAgICovXG4gIHByaXZhdGUgZHJhd0NoZXNzKHsgeCwgeSwgYyB9OiBDaGVzc0RhdGEpIHtcbiAgICBsZXQgcng6IG51bWJlciA9IDIwICsgeCAqIDQwLFxuICAgICAgcnk6IG51bWJlciA9IDIwICsgeSAqIDQwLFxuICAgICAgcjogbnVtYmVyID0gMTUsXG4gICAgICBwaTogbnVtYmVyID0gMiAqIE1hdGguUEk7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMocngsIHJ5LCByLCAwLCBwaSk7XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGxldCBncmFkaWVudCA9IHRoaXMuY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChcbiAgICAgIHJ4ICsgMixcbiAgICAgIHJ5IC0gMixcbiAgICAgIHIsXG4gICAgICByeCArIDIsXG4gICAgICByeSArIDIsXG4gICAgICAwXG4gICAgKTtcbiAgICBpZiAoYyA9PT0gMSkge1xuICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICcjMEEwQTBBJyk7XG4gICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJyM2MzY3NjYnKTtcbiAgICB9IGVsc2UgaWYgKGMgPT09IC0xKSB7XG4gICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyNEMUQxRDEnKTtcbiAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAnI0Y5RjlGOScpO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgfVxuICAvKipcbiAgICog6KiI566X6Ly46LSP57WQ5p6cXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IOW6p+aomVjou7hcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkg5bqn5qiZWei7uFxuICAgKiBAcGFyYW0ge251bWJlcn0gYyDmo4vlrZDpoY/oibIoMW9yLTEpXG4gICAqL1xuICBwcml2YXRlIGp1ZGdlbWVudCh7IHgsIHksIGMgfTogQ2hlc3NEYXRhKTogdm9pZCB7XG4gICAgbGV0IHJvdzogQ291bnRlciA9IHsgY291bnQ6IC0xLCBicmlnaHQ6IGZhbHNlLCBibGVmdDogZmFsc2UgfTtcbiAgICBsZXQgY29sOiBDb3VudGVyID0geyBjb3VudDogLTEsIGJyaWdodDogZmFsc2UsIGJsZWZ0OiBmYWxzZSB9O1xuICAgIGxldCBsdHJiOiBDb3VudGVyID0geyBjb3VudDogLTEsIGJyaWdodDogZmFsc2UsIGJsZWZ0OiBmYWxzZSB9O1xuICAgIGxldCBydGxiOiBDb3VudGVyID0geyBjb3VudDogLTEsIGJyaWdodDogZmFsc2UsIGJsZWZ0OiBmYWxzZSB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAvLyDmsLTlubNcbiAgICAgIGlmICh0aGlzLmRhdGFbeCArIGldICYmICFyb3cuYnJpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeCArIGldW3ldID09IGMpIHJvdy5jb3VudCsrO1xuICAgICAgICBlbHNlIHJvdy5icmlnaHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGF0YVt4IC0gaV0gJiYgIXJvdy5ibGVmdCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhW3ggLSBpXVt5XSA9PT0gYykgcm93LmNvdW50Kys7XG4gICAgICAgIGVsc2Ugcm93LmJsZWZ0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIOWeguebtFxuICAgICAgaWYgKHRoaXMuZGF0YVt5ICsgaV0gJiYgIWNvbC5icmlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt4XVt5ICsgaV0gPT0gYykgY29sLmNvdW50Kys7XG4gICAgICAgIGVsc2UgY29sLmJyaWdodCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kYXRhW3kgLSBpXSAmJiAhY29sLmJsZWZ0KSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeF1beSAtIGldID09PSBjKSBjb2wuY291bnQrKztcbiAgICAgICAgZWxzZSBjb2wuYmxlZnQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8g5bem5LiK5Y+z5LiLXG4gICAgICBpZiAodGhpcy5kYXRhW3ggKyBpXSAmJiB0aGlzLmRhdGFbeSArIGldICYmICFsdHJiLmJyaWdodCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhW3ggKyBpXVt5ICsgaV0gPT0gYykgbHRyYi5jb3VudCsrO1xuICAgICAgICBlbHNlIGx0cmIuYnJpZ2h0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRhdGFbeCAtIGldICYmIHRoaXMuZGF0YVt5IC0gaV0gJiYgIWx0cmIuYmxlZnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt4IC0gaV1beSAtIGldID09PSBjKSBsdHJiLmNvdW50Kys7XG4gICAgICAgIGVsc2UgbHRyYi5ibGVmdCA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyDlj7PkuIrlt6bkuItcbiAgICAgIGlmICh0aGlzLmRhdGFbeCArIGldICYmIHRoaXMuZGF0YVt5IC0gaV0gJiYgIXJ0bGIuYnJpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeCArIGldW3kgLSBpXSA9PSBjKSBydGxiLmNvdW50Kys7XG4gICAgICAgIGVsc2UgcnRsYi5icmlnaHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGF0YVt4IC0gaV0gJiYgdGhpcy5kYXRhW3kgKyBpXSAmJiAhcnRsYi5ibGVmdCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhW3ggLSBpXVt5ICsgaV0gPT09IGMpIHJ0bGIuY291bnQrKztcbiAgICAgICAgZWxzZSBydGxiLmJsZWZ0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgcm93LmNvdW50ID49IDUgfHxcbiAgICAgIGNvbC5jb3VudCA+PSA1IHx8XG4gICAgICBsdHJiLmNvdW50ID49IDUgfHxcbiAgICAgIHJ0bGIuY291bnQgPj0gNVxuICAgICkge1xuICAgICAgdGhpcy53aW5uZXIgPSBjO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog5Zyo5qOL5a2Q5LiK5qiZ6KiY57SF6bueXG4gICAqL1xuICBwcml2YXRlIG1hcmsoKSB7XG4gICAgaWYgKCF0aGlzLmxhc3RDaGVzcykgcmV0dXJuO1xuICAgIGxldCB7IHB4LCBweSB9ID0gdGhpcy5sYXN0Q2hlc3M7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QocHggLSAyLjUsIHB5IC0gMi41LCA1LCA1KTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gIH1cbiAgLyoqXG4gICAqIOa7keWFpeeahOaZguWAmee5quijveaWueWhilxuICAgKiBAcGFyYW0gcHggWOi7uOS9jee9rlxuICAgKiBAcGFyYW0gcHkgWei7uOS9jee9rlxuICAgKi9cbiAgcHJpdmF0ZSBkcmF3QmxvY2socHg6IG51bWJlciwgcHk6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmlzV2hpdGUpIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpJztcbiAgICBlbHNlIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwLjUpJztcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHB4IC0gMjAsIHB5IC0gMjAsIDQwLCA0MCk7XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmluaXRhbCgpO1xuICB9XG4gIC8qKlxuICAgKiAg5Yid5aeL5YyW5qOL55ukXG4gICAqL1xuICBwdWJsaWMgaW5pdGFsKCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJCb2FyZCgpO1xuICAgIHRoaXMuZHJhd0JvYXJkKCk7XG4gIH1cbiAgLyoqXG4gICAqIOa4hemZpOaji+ebpFxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhckJvYXJkKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM4NDVjM2InO1xuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgfVxuICAvKipcbiAgICog57mq6KO95qOL55ukXG4gICAqL1xuICBwcml2YXRlIGRyYXdCb2FyZCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMjA7IGkgPCB0aGlzLmNhbnZhcy5oZWlnaHQ7IGkgKz0gNDApIHtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9ICcjMDAwJztcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oMjAsIGkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLmNhbnZhcy5oZWlnaHQgLSAyMCwgaSk7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKGksIDIwKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oaSwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gMjApO1xuICAgICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IERyYXdNYXAgZnJvbSAnLi9kcmF3TWFwJztcbmltcG9ydCBDaGVzcyBmcm9tICcuL2NoZXNzJztcbmxldCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xubGV0IGNvbnRleHQgPSA8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xubGV0IGRyYXdNYXAgPSBuZXcgRHJhd01hcChjYW52YXMsIGNvbnRleHQpO1xubGV0IGNoZXNzID0gbmV3IENoZXNzKGNvbnRleHQpO1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgY2hlc3MucGxheSh7IGUsIG9mZnNldDogY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIH0pO1xuICBpZiAoY2hlc3Mud2lubmVyKVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZScpLmlubmVyVGV4dCA9XG4gICAgICBjaGVzcy53aW5uZXIgPT0gMSA/ICdCTEFDSyBXSU4nIDogJ1dISVRFIFdJTic7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XG4gIGRyYXdNYXAuaW5pdGFsKCk7XG4gIGNoZXNzLnJlZnJlc2goKTtcbn0pO1xuZnVuY3Rpb24gcmVmcmVzaChlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gIGRyYXdNYXAuaW5pdGFsKCk7XG4gIGNoZXNzLnJlZnJlc2goKTtcbiAgY2hlc3MuaG92ZXIoeyBlLCBvZmZzZXQ6IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSB9KTtcbn1cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgcmVmcmVzaChlKTtcbn0pO1xuXG5sZXQgcmVzdGFydEJ0biA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydCcpO1xuXG5yZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJykuaW5uZXJUZXh0ID0gJ0dPTU9LVSc7XG4gIGRyYXdNYXAuaW5pdGFsKCk7XG4gIGNoZXNzLmNyZWF0ZU5ld0dhbWUoKTtcbn0pO1xubGV0IHVuZG9CdG4gPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VuZG8nKTtcbnVuZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAoY2hlc3Mud2lubmVyKSByZXR1cm47XG4gIGNoZXNzLnVuZG8oKTtcbiAgZHJhd01hcC5pbml0YWwoKTtcbiAgY2hlc3MucmVmcmVzaCgpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9
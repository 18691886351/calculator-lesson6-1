/*begin===============计算器======================*/
var btns = document.getElementsByClassName("task2-calc-btn");
var str = "";
var number1 = "";
var number2 = "";
var tmp = "";
var r1 = new RegExp("^\\d+(\\.\\d+)?$");
var r2 = new RegExp("^\\d+(\\.)?$");
var exp = "";
var exp_reg = new RegExp("^\\d+(\\.\\d+)?[*\\-+/]$");
var action = "";
var result = "";
/*alert(btns.length);*/
for (btn in btns) {
    btns[btn].onclick = function() {
        if (this.innerHTML == "C") {
            clearShow();
            clearResult();
            return;
        } else if (this.innerHTML == "=") {
            var _result;
            console.log("number1=" + number1 + " number2=" + number2 + " action=" + action);
            if (number1.length != 0 && number2.length != 0 && action.length != 0) {
                try {
                    _number1 = parseFloat(number1);
                    _number2 = parseFloat(number2);
                    _result = clac(_number1, _number2, action);
                } catch (e) {
                    console.log(e.message);
                    _result = e.message;
                }
                /*按=号可以重复之前的action进行连续*/
                if (type.isNumber(_result) && isNaN(_result) == false) {
                    number1 = _result.toFixed(8);
                    result = _result.toFixed(8);
                    document.getElementById("task2-res").value = parseFloat(result);
                } else {
                    result = _result;
                    document.getElementById("task2-res").value = result;
                }
                clearShow();
            }

        } else if (this.innerHTML == "×" || this.innerHTML == "-" || this.innerHTML == "+" || this.innerHTML == "÷") {
            action = this.innerHTML;
            console.log("number1=" + number1 + " number2=" + number2 + " action=" + action);
            if (number1.length != 0) {
                _number1 = parseFloat(parseFloat(number1).toFixed(8));
                exp = _number1 + " " + action;
                document.getElementById("task2-res").value = exp;
                clearShow();
                result = "";
            }

        } else if (this.innerHTML == "√" || this.innerHTML == "±" || this.innerHTML == "％" || this.innerHTML == "X^2" || this.innerHTML == "cos" || this.innerHTML == "sin" || this.innerHTML == "log") {
            var _result;
            action = this.innerHTML;
            console.log("number1=" + number1 + " action=" + action);
            if (number1.length != 0 && action.length != 0) {
                try {
                    _number1 = parseFloat(number1);
                    _result = clac1(_number1, action);
                } catch (e) {
                    console.log(e.message);
                    _result = e.message;
                }
            }
            /*进行连续运算*/
            if (type.isNumber(_result) && isNaN(_result) == false) {
                number1 = _result.toFixed(8); //number1为String类型
                result = _result.toFixed(8);
                document.getElementById("task2-res").value = parseFloat(result);
            } else {
                result = _result;
                document.getElementById("task2-res").value = result;
            }
            clearShow();

        } else {
            tmp = str + this.innerHTML;
            if (r1.test(tmp) || r2.test(tmp)) {
                str = str + this.innerHTML;
                document.getElementById("task2-show").value = str;
                if (action.length == 0 || result.length != 0) {
                    number1 = str;
                    action = "";
                    result = "";
                } else {
                    number2 = str;
                }
            }
        }
    }
}

function clearShow() {
    document.getElementById("task2-show").value = "";
    str = "";
}

function clearResult() {
    document.getElementById("task2-res").value = "";
    exp = "";
}

/*
number 操作数
action  运算符
返回数据类型
*/
function clac1(number, action) {
    if (type.isNumber(number) == false) throw new IsNotNumberTypeError(number1);
    if (action != "√" && action != "±" && action != "％" && action != "X^2" && action != "cos" && action != "log" && action != "sin") throw new ActionUndefineError();
    var _result = 0;
    console.log("number=" + number + " action=" + action);
    switch (action) {
        case "√": //平方根
            _result = Math.sqrt(number);
            break;
        case "±": //正负数
            _result = number * -1;
            break;
        case "％": //百分数
            _result = (number / 100);
            _result = parseFloat(_result.toFixed(2));
            break;
        case "X^2":
            _result = number * number;
            break;
        case "cos":
            _result = Math.cos(number);
            break;
        case "log": //0与负数无对数
            if (number <= 0) throw new InvalidInputError();
            _result = Math.log(number);
            break;
        case "sin":
            _result = Math.sin(number);
            break;
    }
    return _result;
}

/*
number1 操作数1
number2 操作数2
action  运算符
返回数据类型
*/
function clac(number1, number2, action) {
    if (type.isNumber(number1) == false) throw new IsNotNumberTypeError(number1);
    if (type.isNumber(number2) == false) throw new IsNotNumberTypeError(number2);
    if (action != "×" && action != "-" && action != "+" && action != "÷") throw new ActionUndefineError();
    var _result = 0;
    console.log("number1=" + number1 + " number2=" + number2 + " action=" + action);
    switch (action) {
        case "+":
            _result = number1 + number2;
            break;
        case "-":
            _result = number1 - number2;
            break;
        case "×":
            _result = number1 * number2;
            break;
        case "÷":
            if (number2 == 0 && number1 == 0) throw new ResultUndefineError();
            if (number2 == 0) throw new DivisorIsZeroError();
            _result = number1 / number2;
            break;
    }
    return _result;
}
/*非数字类型异常*/
function IsNotNumberTypeError(message) {
    this.message = message || "非数字类型";
    this.name = "DivisorIsZeroError";
}
IsNotNumberTypeError.prototype = new Error();
IsNotNumberTypeError.prototype.constructor = IsNotNumberTypeError;
/*除数异常*/
function DivisorIsZeroError(message) {
    this.message = message || "除数不能为零";
    this.name = "DivisorIsZeroError";
}
DivisorIsZeroError.prototype = new Error();
DivisorIsZeroError.prototype.constructor = DivisorIsZeroError;
/*结果为定义异常*/
function ResultUndefineError(message) {
    this.message = message || "结果未定义";
    this.name = "ResultUndefineError";
}
ResultUndefineError.prototype = new Error();
ResultUndefineError.prototype.constructor = ResultUndefineError;
/*未定义Action*/
function ActionUndefineError(message) {
    this.message = message || "操作符未定义";
    this.name = "ActionUndefineError";
}
ActionUndefineError.prototype = new Error();
ActionUndefineError.prototype.constructor = ActionUndefineError;
/*0与负数无对数*/
function InvalidInputError(message) {
    this.message = message || "无效输入";
    this.name = "InvalidInputError";
}
InvalidInputError.prototype = new Error();
InvalidInputError.prototype.constructor = InvalidInputError;
/*===============计算器======================end*/

/*判断数据类型*/
var type = function(o) {
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
    'Undefined',
    'Object',
    'Array',
    'String',
    'Number',
    'Boolean',
    'Function',
    'RegExp',
    'NaN',
    'Infinite'
].forEach(function(t) {
    type['is' + t] = function(o) {
        return type(o) === t.toLowerCase();
    };
});

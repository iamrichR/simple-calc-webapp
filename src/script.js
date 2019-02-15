let currentNumber = "";

let displayingResult = false;
let powerON = true;
let DEBUG = false;

let displayWindow = document.getElementById("display-text");

let expr = [];
const acceptableOperations = ["+","-","*","^","/"];

updateDisplay();

let btn_table = {
	"btn-ON":[function(){turnOnPower();}],
	"btn-OFF":[function(){turnOffPower();}],
	"btn-7":[function(){updateCurrentNumber("7");}],
	"btn-8":[function(){updateCurrentNumber("8");}],
	"btn-9":[function(){updateCurrentNumber("9");}],
	"btn-4":[function(){updateCurrentNumber("4");}],
	"btn-5":[function(){updateCurrentNumber("5");}],
	"btn-6":[function(){updateCurrentNumber("6");}],
	"btn-1":[function(){updateCurrentNumber("1");}],
	"btn-2":[function(){updateCurrentNumber("2");}],
	"btn-3":[function(){updateCurrentNumber("3");}],
	"btn-0":[function(){updateCurrentNumber("0");}],
	"btn-00":[function(){updateCurrentNumber("00");}],
	"btn-dot":[function(){updateCurrentNumber(".");}],
	"btn-expo":[function(){addOp("^");}],
	"btn-times":[function(){addOp("*");}],
	"btn-plus":[function(){addOp("+");}],
	"btn-equals":[function(){resolveExpression();}],
	"btn-divide":[function(){addOp("/");}],
	"btn-minus":[function(){addOp("-");}],
	"btn-plusminus":[function(){plusMinus();}]
};

Object.keys(btn_table).forEach(function(element){document.getElementById(element).addEventListener("click",btn_table[element][0]);});
//pretty sure that's the longest line of javascript I've written so far, just saying



/***  FUNCTION DEFS  ***/

function addNum(){
	if(!isNaN(Number(currentNumber)) && currentNumber != null){
		expr.push(currentNumber);
		currentNumber = "";
		updateDisplay();
		return true;
	} else {
		if(DEBUG){
			console.log("Error in addNum(), currentNumber '" + currentNumber + "' is not a number");
		}
		displayWindow.innerHTML = "Err"
		return false;
	}
}

function addOp(op){
	if(addNum() && acceptableOperations.includes(op)){
		expr.push(op);
		updateDisplay();
		if(DEBUG){
			console.log("expr array current state:  " + expr);
		}
	} else {
		if(DEBUG){
			console.log("Error occured in addOp(), value '" + op + "' not added to expr array.");
			console.log("currentNumber value is " + currentNumber);
		}
	}
}

function getDisplayString(){
	let exprString = expr.join("").replace("*","x") + currentNumber;
	if(exprString == ""){
		exprString = "0";
	}
	return exprString;
}

function getEvalString(){
	let evalArr = [];
	let exprLen = expr.length;
	for(let i = 0; i < exprLen; i++){
		if(expr[i] == "^"){
			evalArr.push("Math.pow(" + evalArr.pop() + "," + expr[i+1] + ")");
			i += 1;
		} else{
			evalArr.push(expr[i]);
		}
	}
	return eval(evalArr.join("").replace("--","+"));
}

function plusMinus(){
	if(currentNumber != ""){
		currentNumber = currentNumber*-1;
		updateDisplay();
	}
}

function resolveExpression(){
	if(powerON){
		if(!displayingResult){
			addNum();
			displayingResult = true;
			updateDisplay();
			expr = [];
		}
	}
}

function turnOnPower(){
	if(!powerON){
		powerON = true;
		updateDisplay();
	}
}

function turnOffPower(){
	if(powerON){
		powerON = false;
		displayWindow.innerHTML = ""
	}
}

function updateCurrentNumber(num){
	if(displayingResult){
		displayingResult = false;
	}
	currentNumber = currentNumber.concat(num);
	updateDisplay();
	if(DEBUG){
		console.log("currentNumber value updated:  " + currentNumber);
	}
}

function updateDisplay(){
	if(powerON){
		if(displayingResult){
			displayWindow.innerHTML = getEvalString();
		} else{
			let displayStr = getDisplayString();
			if(displayStr == "0" && currentNumber != ""){
				displayWindow.innerHTML = currentNumber;
			} else {
				displayWindow.innerHTML = getDisplayString();
			}
		}
	}
}

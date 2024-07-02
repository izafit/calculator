const currentNumber = document.querySelector(".currentNumber");
const previousNumber = document.querySelector(".previousNumber p");
const clearBtn = document.querySelector(".clear");
const mathSign = document.querySelector(".mathSign");
const numbersButtons = document.querySelectorAll(".number");
const operatorsButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const calculatorHistory = document.querySelector(".history");
const historyBtn = document.querySelector(".history-btn");
const delBtn = document.querySelector(".delete");

let result = "";

function displayNumbers() {
  if (this.textContent === "." && currentNumber.innerHTML.includes(".")) return;
  if (this.textContent === "." && currentNumber.innerHTML === "")
    return (currentNumber.innerHTML = ".0");

  currentNumber.innerHTML += this.textContent;
}

function operate() {
  if (currentNumber.innerHTML === "" && this.textContent === "-") {
    currentNumber.innerHTML = "-";
    return;
  } else if (currentNumber.innerHTML === "") {
    return;
  }

  if (mathSign.innerHTML !== "") {
    showResult();
  }

  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = "";
}

function showResult() {
  if (previousNumber.innerHTML === "" || currentNumber.innerHTML === "") return;

  let a = Number(currentNumber.innerHTML);
  let b = Number(previousNumber.innerHTML);
  let operator = mathSign.innerHTML;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = b - a;
      break;
    case "x":
      result = a * b;
      break;
    case "÷":
      if (a === 0) {
        clearScreen();
        return;
      }
      result = b / a;
      break;
    case "^":
      result = Math.pow(b, a);
      break;
    case "%":
      result = (b / 100) * a; // wylicza a procent z b
      break;
    case "log":
      result = Math.log(b) / Math.log(a);
      break;
  }

  addToHistory();
  historyBtn.classList.add("active");
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

function del() {
  currentNumber.innerHTML = currentNumber.innerHTML.slice(0, -1);
}

function addToHistory() {
  const newHistoryItem = document.createElement("li");
  newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`;
  newHistoryItem.classList.add("history-item");
  calculatorHistory.appendChild(newHistoryItem);
}

function clearHistory() {
  calculatorHistory.innerHTML = "";
  historyBtn.classList.remove("active");
}

function clearScreen() {
  result = "";
  currentNumber.innerHTML = "";
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

operatorsButtons.forEach((button) => button.addEventListener("click", operate));

equalsButton.addEventListener("click", showResult);

clearBtn.addEventListener("click", clearScreen);

delBtn.addEventListener("click", del);

numbersButtons.forEach((button) =>
  button.addEventListener("click", displayNumbers)
);

historyBtn.addEventListener("click", clearHistory);

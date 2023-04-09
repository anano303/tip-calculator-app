let bill;
let tipPercent;
let people;
let totalPerPerson;
let tipPerPerson;

let billInput = document.querySelector("#bill");
let peopleInput = document.querySelector("#people");
let tipInput = document.querySelector("#tip");

let totalPerPersonOutput = document.querySelector("#totalPerPerson");
let tipPerPersonOutput = document.querySelector("#tipPerPerson");
let reset = document.querySelector("#reset");
let buttons = document.querySelector(".Select-Tip").querySelectorAll("button");

billInput.addEventListener("input", billInputChange);
peopleInput.addEventListener("input", peopleInputChange);
tipInput.addEventListener("input", tipInputChange);
reset.addEventListener("click", resetFunction);

resetFunction();

const showResults = () => {
  totalPerPersonOutput.innerHTML = "$" + totalPerPerson;
  tipPerPersonOutput.innerHTML = "$" + tipPerPerson;
};

const calculateResults = () => {
  if (!bill || !people || !tipPercent) {
    return;
  }
  tipPerPerson = +((bill * tipPercent) / 100 / people).toFixed(2);
  totalPerPerson = +(bill / people + tipPerPerson).toFixed(2);

  showResults();
};

function billInputChange() {
  bill = +billInput.value;
  if (bill >= 100000) {
    bill = 99999;
    billInput.value = bill;
    return false;
  }
  calculateResults();
}

function peopleInputChange() {
  people = +peopleInput.value;
  if (people < 1) {
    peopleInput.classList.add("error");
    document.querySelector("#error").classList.add("visible");
  } else {
    peopleInput.classList.remove("error");
    document.querySelector("#error").classList.remove("visible");
    calculateResults();
  }
}

function tipInputChange() {
  tipPercent = +tipInput.value;
  calculateResults();
}

function tipButtonClicked(percent, e) {
  tipPercent = percent;
  calculateResults();

  buttons.forEach((child) => {
    child.classList.remove("clicked");
  });
  e.target.classList.add("clicked");
}

function resetFunction() {
  billInput.value = "";
  peopleInput.value = "1";
  tipPerPersonOutput.innerHTML = "$" + (0.0).toFixed(2);
  totalPerPersonOutput.innerHTML = "$" + (0.0).toFixed(2);
  buttons.forEach((btn) => btn.classList.remove("clicked"));
  bill = "";
  people = 1;
  tip = "";
  tipInput.value = "";
}

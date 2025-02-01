// Global Variables
let confBtns = document.querySelectorAll(".navigation-confirm");
let nextBtns = document.querySelectorAll(".navigation-go-forward");
let backBtns = document.querySelectorAll(".navigation-go-back");
let thankMsg = document.getElementById("thank-you");
let sectionIds = ["one", "two", "three", "four"];
let stepsIndicator = document.querySelectorAll(".leftPrt__currentNumber");
let currentStep = 0;
let yearly = false;

// First Section Variables
let nameInput = document.getElementById("name");
let mailInput = document.getElementById("mail");
let phoneInput = document.getElementById("phone");

// Second Section Variables
let planInputs = document.querySelectorAll(".rightPrt__planSection__planItem input");
let planItems = document.querySelectorAll(".rightPrt__planSection__planItem");
let timeLine = document.getElementById("timeline");

// Third Section Variables
let checkBoxes = document.querySelectorAll("input[type='checkbox']");

// Fourth Section Variables
let changePlan = document.getElementById("change-plan");

document.forms[0].addEventListener("submit", e => e.preventDefault());
changePlan.addEventListener("click", () => {
    currentStep = 1;
    sectionSwitching();
});

confBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.forms[0].style.display = 'none';
        document.querySelector(".externalArrows").style.display = 'none';
        thankMsg.style.display = "block";
    });
});

function sectionSwitching() {
    sectionIds.forEach(section => document.getElementById(section).style.display = section == sectionIds[currentStep]? "block": "none");
    focusTheFirstElement(currentStep);
    
    stepsIndicator.forEach(step => step.classList.remove("active")); 
    stepsIndicator[currentStep].classList.add("active");

    nextBtns.forEach(btn => btn.style.display = currentStep == 3? "none": "block");
    confBtns.forEach(btn => btn.style.display = currentStep == 3? "block": "none");
    backBtns.forEach(btn => btn.style.display = currentStep == 0? "none": "block");
}

document.addEventListener("DOMContentLoaded", () => {
    sectionSwitching();
    
    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (inputCheck(currentStep)) {
                currentStep++;
                sectionSwitching();
                if (currentStep == 3) summarySection();
            }
        })
    })
    
    backBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep--;
            sectionSwitching();
        })
    })
});

timeLine.addEventListener("click", () => {
    timeLine.classList.toggle("checked");
    timeLine.classList.contains("checked")? yearly = true: yearly = false;

    planInputs.forEach(input => {
        input.value *= yearly? 10: 0.1;
        input.parentElement.querySelector(".rightPrt__planSection__planItem__inputPrice").textContent = `$${input.value}/${yearly? "yr": "mo"}`;
        input.parentElement.classList.toggle("yearly");
    });

    checkBoxes.forEach((box) => {
        box.value *= yearly? 10: 0.1;
        box.parentElement.querySelector(".rightPrt__addSection__inputPrice").textContent = `+$${box.value}/${yearly? "yr": "mo"}`;
    });
});

timeLine.parentElement.addEventListener("keyup", (e) => {
    if (e.code == "Space") timeLine.click();
});

document.querySelectorAll("button, label").forEach(element => {
    element.addEventListener("keyup", (e) => {
        if (e.code == "Space") element.click();
    })
})

nameInput.addEventListener("input", () => removeError(nameInput));
mailInput.addEventListener("input", () => removeError(mailInput));
phoneInput.addEventListener("input", () => removeError(phoneInput));

function inputCheck(step) {
    let isValid = true;

    if (step == 0) {
        if (nameInput.value.length == 0) {
            showError(nameInput, "This field is required");
            isValid = false;
        }
        
        if (mailInput.value.length == 0) {
            showError(mailInput, "This field is required");
            isValid = false;
        } else if (!/^[a-zA-Z0-9.%\-_]+@[a-zA-Z.-]+\.[a-zA-Z]{2,12}$/.test(mailInput.value)) {
            showError(mailInput, "Write a valid email");
            isValid = false;
        }
        
        if (phoneInput.value == 0) {
            showError(phoneInput, "This field is required");
            isValid = false;
        } else if (!/\d{10,14}/.test(phoneInput.value)) {
            showError(phoneInput, "Numbers only allowed (between 10 and 14)");
            isValid = false;
        }

        if (!isValid) document.querySelector("input.error").focus();
    }


    return isValid;
}

function showError(element, message) {
    element.classList.add("error");
    element.parentElement.querySelector("p").textContent = message;
}

function removeError(element) {
    element.classList.remove("error");
    element.parentElement.querySelector("p").textContent = "";
}

function focusTheFirstElement(step) {
    let element = null;
    step == 0? element = "input": step == 1 || step == 2? element = "label": step == 3? element = "button": null;

    if (element) document.getElementById(sectionIds[step]).querySelector(element).focus();
}

function summarySection() {
    let summaryPlanTitle = document.getElementById("finishup-plan-title");
    let summaryPlanCost = document.getElementById("finishup-plan-cost");
    let summaryBox = document.querySelector(".rightPrt__finish__box");
    let addsChecked = document.querySelectorAll("input[type='checkbox']:checked");
    let selectedPlan = document.querySelector(".rightPrt__planSection__planItem input:checked");
    let summaryPriceSum = 0;
    let totalTxt = document.querySelector(".rightPrt__finish__total__txt");
    let totalCost = document.querySelector(".rightPrt__finish__total__cost");

    summaryBox.querySelectorAll("li:not(:first-child)").forEach(li => li.remove())

    summaryPlanTitle.textContent = `${selectedPlan.parentElement.querySelector("h3").textContent} (${yearly? "Yearly": "Monthly"})`;
    summaryPlanCost.textContent = `$${selectedPlan.value}/(${yearly? "yr": "mo"})`;
    summaryPriceSum += +selectedPlan.value;
    addsChecked.forEach(box => {
        let addElement = document.createElement("p");
        addElement.className = "add";
        addElement.append(box.parentElement.querySelector("h3").textContent)
        let priceElement = document.createElement("p");
        priceElement.className = 'cost';
        priceElement.append(box.parentElement.querySelector(".rightPrt__addSection__inputPrice").textContent);
        summaryPriceSum += +box.value;
        let summaryListItem = document.createElement("li");
        summaryListItem.className = "rightPrt__finish__item";
        summaryListItem.append(addElement);
        summaryListItem.append(priceElement);
        summaryBox.append(summaryListItem);
    });

    totalTxt.textContent = `Total (per ${yearly? "year": "month"})`;
    totalCost.textContent = `+$${summaryPriceSum}/${yearly? "yr": "mo"}`
}

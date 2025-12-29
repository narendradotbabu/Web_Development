const BASE = "https://api.frankfurter.app/latest";


let fromcurr = document.querySelector("select[name='from']");
let tocurr = document.querySelector("select[name='too']");
let drpdwn = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");

// Populate dropdowns
for (let i of drpdwn) {
    for (let j in countryList) {
        let newopt = document.createElement("option");
        newopt.innerText = j;
        newopt.value = j;

        if (i.name === "from" && j === "USD") newopt.selected = true;
        else if (i.name === "too" && j === "INR") newopt.selected = true;

        i.append(newopt);
    }

    i.addEventListener("change", (evt) => {
        updateflg(evt.target);
    });
}

// Update flag
const updateflg = (element) => {
    let curcode = element.value;
    let countrycode = countryList[curcode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
};

// Convert currency
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amountInput = document.querySelector("#amount");
    let amtval = Number(amountInput.value);

    if (!amtval || amtval < 1) {
        amtval = 1;
        amountInput.value = "1";
    }

 
   const from = fromcurr.value;
const to = tocurr.value;
const url = `${BASE}?amount=${amtval}&from=${from}&to=${to}`;

const res = await fetch(url);
const data = await res.json();

finalAmount = data.rates[to];

btn.value=`The Exchange rate: ${finalAmount}`;
});

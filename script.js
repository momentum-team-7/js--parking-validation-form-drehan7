let submitButton = document.querySelector("#submit-button");
let form = document.querySelector("#parking-form");
let total = document.querySelector("#total");
let startDate = document.querySelector("#start-date");
let numDays = parseInt(document.querySelector("#days").value);

window.addEventListener('submit', e => {
    e.preventDefault();
})



submitButton.addEventListener("click", e=> {
    let result = getTotal(countDays(getDayOfWeek(startDate), numDays));
    let daysArray = countDays(getDayOfWeek(startDate), numDays);
    console.log(result);
    console.log(daysArray);

    total.textContent = result;
})





// Calculate total for amount of parked days
// $5 per weekday; $7 per weekend
function getTotal(daysArray) {
    let totalCost = 0;

    for (let i = 0; i < daysArray.length; i++) {
        if (daysArray[i] === 0 || daysArray[i] === 6) {
            totalCost += 7;
        } else {
            totalCost += 5;
        }
    }
    
    console.log(totalCost);

    return totalCost;

}

// puts days parked into an array
function countDays(startingDate, numOfDays) {
    
    let dayArray = [];
    for (let i = 0; i < numOfDays; i++) {
        dayArray.push(startingDate + i);
    }


    let finalDayArray = dayArray.map(x => x % 7);
    return finalDayArray;

}

// Gets the day of the week from the date in user form
// Returns a number corresponding to day
// days -> [sun, mon, tue, wed, thu, fri, sat] 0 - 6
// weekends [0] & [6]
function getDayOfWeek(startingDate) {

    // Convert to correct date format
    let actualDate = startingDate.value.replace(/-/g, '\/');
    let d = new Date(actualDate).getDay();

    return d;
}



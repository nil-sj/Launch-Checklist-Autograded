// Write your helper functions here!

// require('cross-fetch/polyfill');

// function stripSpace(someInputString) {
//     return someInputString.split(" ").map(item => item.trim()).join('');
// }

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let myTarget = document.querySelector('#missionTarget');

    // expect(testTarget).toBe('<h2>MissionDestination</h2><ol><li>Name:Saturn/Titan</li><li>Diameter:5149.5km</li><li>Star:Sol</li><li>DistancefromEarth:1.4billionkmfromEarth</li><li>NumberofMoons:0</li></ol><imgsrc="https://solarsystem.nasa.gov/system/resources/detail_files/16278_PIA20016.jpg">');
    myTarget.innerHTML =`<h2>Mission Destination</h2><ol><li>Name: ${name}</li><li>Diameter: ${diameter}</li><li>Star: ${star}</li><li>Distance from Earth: ${distance}</li><li>Number of Moons: ${moons}</li></ol><img src="${imageUrl}">`;
}

function validateInput(testInput) {
    if (testInput == "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatusElem = document.querySelector('#pilotStatus');
    let copilotStatusElem = document.querySelector('#copilotStatus');
    let fuelStatusElem = document.querySelector('#fuelStatus');
    let cargoStatusElem = document.querySelector('#cargoStatus');
    let launchStatusElem = document.querySelector('#launchStatus');
    let faultyItemsElem = list;

    let readyToLaunch = true;

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" ||
        validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
    } else if (

        validateInput(pilot) === "Is a Number" ||
        validateInput(copilot) === "Is a Number" ||
        validateInput(fuelLevel) === "Not a Number" ||
        validateInput(cargoLevel) === "Not a Number"
    ) {
        alert("Make sure to enter valid information for each field!");
    } else {
        pilotStatusElem.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatusElem.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        if (Number(fuelLevel) >= 10000) {
            fuelStatusElem.innerHTML = `Fuel level high enough for launch`;
        } else {
            faultyItemsElem.style.visibility = 'visible';
            launchStatusElem.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatusElem.style.color = 'red';
            fuelStatusElem.innerHTML = `Fuel level too low for launch`;
            readyToLaunch = false;
        }
        if (Number(cargoLevel) < 10000) {
            cargoStatusElem.innerHTML = `Cargo mass low enough for launch`;
        } else {
            faultyItemsElem.style.visibility = 'visible';
            launchStatusElem.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatusElem.style.color = 'red';
            cargoStatusElem.innerHTML = `Cargo mass too heavy for launch`;
            readyToLaunch = false;
        }
    }

    if (readyToLaunch) {
        launchStatusElem.innerHTML = "Shuttle is Ready for Launch";
        launchStatusElem.style.color = 'green';
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(function (response) {
            return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let pickedPlanet = planets[Math.floor(Math.random() * planets.length)];
    return pickedPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
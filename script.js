// Write your JavaScript code here!

const { myFetch, pickPlanet, addDestinationInfo, formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {
    console.log("I am here after load");
    let form = document.getElementById('form');
    console.log(form);

    form.addEventListener("submit", function(event){
        alert("This code is run");
        event.preventDefault();
        let document = document;
        let list = document.getElementById('faultyItems');
        let pilot = document.querySelector("input[name=pilotName]");
        let copilot = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoLevel = document.querySelector("input[name=cargoMass]");
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet from the list of planets and add that information to your destination.
        let myPickedPlanet = pickPlanet(listedPlanets);
        let { name, diameter, star, distance, moons, image } = myPickedPlanet;
        addDestinationInfo(document, name, diameter, star, distance, moons, image);
    })

    

    
 });
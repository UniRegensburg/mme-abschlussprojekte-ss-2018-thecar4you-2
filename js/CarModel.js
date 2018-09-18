/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarModel = function() {
  "use strict";

  var that = {},
  savedAlter = 2013,
  savedKm = 100, //in tausend km
  savedMoney = 0,
  lastMoney,
  savedPs = 100,
  savedVerbrauch = 10,
  benzin = true,
  diesel = true,
  savedCarType = 5,
  savedSeats,
  distArray=[],
  distIndex=0,
  hardData=[],
  softData=[];

	function initCarModel() {
    createSavedSeats();
  }

  function updateAlter(alter) {
    savedAlter = alter;
    document.getElementById("alterSlider").value = savedAlter; // TODO: in view!!!
    //if (savedAlter === 1998) {
    //  savedAlter = 0;
    //}
  }

  function updateKm(alter) {
    savedKm = alter;
    document.getElementById("kmSlider").value = savedKm; // TODO: in view!!!
  }

  function updateMoney(money) {
    lastMoney = parseInt(money);
    savedMoney += lastMoney;
    updateMoneyInHtml(savedMoney);
  }

  function deleteMoney() {
    savedMoney = 0;
    lastMoney = 0;
    updateMoneyInHtml(savedMoney);
  }

  function backMoney() {
    savedMoney -= lastMoney;
    lastMoney = 0; // TODO: -> nur einmal nutzen mgl bzw. nicht zurück auf 0 mgl
    updateMoneyInHtml(savedMoney);
  }

  function updateMoneyInHtml(money) { // TODO: in view!!!
    let budget= document.getElementsByClassName("budget");
    budget[0].innerHTML = money;
  }

  function calculateDist(iconArray) {
    let x = Math.abs(550/2 - iconArray[distIndex][1]),
    y = Math.abs(550/2 - iconArray[distIndex][2]),
    dist = Math.round(Math.sqrt(x*x + y*y)); //dist in pixeln, muss noch zu km gerechnet werden, dazu bild nötig
    distArray.push(iconArray[distIndex], dist);
    distIndex +=1;
    //console.log(distArray);
  }

  function clearDist() {
    distArray = [];
    distIndex = 0;
  }

  function updatePs(ps) {
    savedPs = ps;
    document.getElementById("psSlider").value = savedPs; // TODO: in view!!!
  }

  function updateSeat(car, seat, type) {
    savedCarType = car; //2=small, 5=normal, 7=van
    savedSeats[seat-1][1] = type;
    //console.log(savedCarType);
    //console.log(savedSeats);
  }

  function deleteSeats() {
    savedCarType = 5;
    for (let i=0; i<savedSeats.length; i++) {
      savedSeats[i][1] = "";
    }
  }

  function createSavedSeats() {
    savedSeats = new Array(7);
    for (let i=0; i<savedSeats.length; i++) {
      savedSeats[i] = new Array(2);
      savedSeats[i][0] = i;
      savedSeats[i][1] = "";
    }
  }

  function updateVerbrauch(amount) {
    let newVerbrauch = savedVerbrauch + parseInt(amount),
    verbrauchHTML;

    if (newVerbrauch > 4 && newVerbrauch < 17) {
      savedVerbrauch = newVerbrauch;
      verbrauchHTML= document.getElementsByClassName("verbrauch"); // TODO: in view!!!
      verbrauchHTML[0].innerHTML = String(savedVerbrauch) + "L/100Km"; // TODO: in view!!!
    }
  }

  function updateFuel(benzinbool, dieselbool) {
    benzin = benzinbool;
    diesel = dieselbool;
    if (benzin === false && diesel === false) {
      benzin = true;
      diesel = true;
    }
  }

  function returnHardData() {
    hardData=[];
    hardData.push(savedMoney);
    hardData.push(savedAlter);
    hardData.push(savedPs);
    hardData.push(savedVerbrauch);
    hardData.push(benzin, diesel);

    console.log(hardData);

    return(hardData);
  }

  function returnSoftData() {
    softData=[];
    softData.push(savedKm);
    softData.push(distArray);
    softData.push(savedCarType);
    softData.push(savedSeats);

    console.log(softData);

    return(softData);
  }

  that.updateAlter = updateAlter;
  that.updateKm = updateKm;
  that.updateMoney = updateMoney;
  that.deleteMoney = deleteMoney;
  that.backMoney = backMoney;
  that.calculateDist = calculateDist;
  that.clearDist = clearDist;
  that.updatePs = updatePs;
  that.updateSeat = updateSeat;
  that.deleteSeats = deleteSeats;
  that.updateVerbrauch = updateVerbrauch;
  that.updateFuel = updateFuel;
  that.returnHardData = returnHardData;
  that.returnSoftData = returnSoftData;
  that.initCarModel = initCarModel;
  return that;
};

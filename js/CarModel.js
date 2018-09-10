/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarModel = function() {
  "use strict";

  var that = {},
  savedAlter,
  savedKm,
  savedMoney = 0,
  lastMoney,
  savedPs,
  savedVerbrauch = 10,
  benzin = true,
  diesel = true,
  savedCarType = 0,
  savedSeats;

	function initCarModel() {
    createSavedSeats();
  }

  function updateAlter(alter) {
    savedAlter = alter;
    document.getElementById("alterSlider").value = savedAlter; // TODO: in view!!!
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

  function updatePs(ps) {
    savedPs = ps;
    document.getElementById("psSlider").value = savedPs; // TODO: in view!!!
  }

  function updateSeat(car, seat, type) {
    savedCarType = car; //2=small, 5=normal, 7=van
    savedSeats[seat-1][1] = type;
    //console.log(savedCarType);
    console.log(savedSeats);
  }

  function deleteSeats() {
    savedCarType = 0;
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

  that.updateAlter = updateAlter;
  that.updateKm = updateKm;
  that.updateMoney = updateMoney;
  that.deleteMoney = deleteMoney;
  that.backMoney = backMoney;
  that.updatePs = updatePs;
  that.updateSeat = updateSeat;
  that.deleteSeats = deleteSeats;
  that.updateVerbrauch = updateVerbrauch;
  that.updateFuel = updateFuel;
  that.initCarModel = initCarModel;
  return that;
};

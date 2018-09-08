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
  diesel = true;

	function initCarModel() {
    //
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

  function updateVerbrauch(amount) {
    let newVerbrauch = savedVerbrauch + parseInt(amount),
    verbrauchHTML;

    if (newVerbrauch > 4 && newVerbrauch < 17) {
      savedVerbrauch = newVerbrauch;
      verbrauchHTML= document.getElementsByClassName("verbrauch"); // TODO: in view!!!
      verbrauchHTML[0].innerHTML = savedVerbrauch; // TODO: in view!!!
    }
  }

  that.updateAlter = updateAlter;
  that.updateKm = updateKm;
  that.updateMoney = updateMoney;
  that.deleteMoney = deleteMoney;
  that.backMoney = backMoney;
  that.updatePs = updatePs;
  that.updateVerbrauch = updateVerbrauch;
  that.initCarModel = initCarModel;
  return that;
};

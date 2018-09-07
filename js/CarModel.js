/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarModel = function() {
  "use strict";

  var that = {},
  savedAlter,
  savedKm;

	function initCarModel() {
    //
  }

  function updateAlter(alter) {
    savedAlter = alter;
    console.log(savedAlter);
    document.getElementById("alterSlider").value = alter; // TODO: in view!!!
  }

  function updateKm(alter) {
    savedKm = alter;
    console.log(savedKm);
    document.getElementById("kmSlider").value = savedKm; // TODO: in view!!!
  }

  that.updateAlter = updateAlter;
  that.updateKm = updateKm;
  that.initCarModel = initCarModel;
  return that;
};

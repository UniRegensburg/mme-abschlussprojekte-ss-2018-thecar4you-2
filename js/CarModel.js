/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarModel = function() {
  "use strict";

  var that = {},
  savedAlter;

	function initCarModel() {
    //
  }

  function updateAlter(alter) {
    savedAlter = alter;
    console.log(savedAlter)
    document.getElementById("alterSlider").value = alter; // TODO: in view!!!
  }

  that.updateAlter = updateAlter;
  that.initCarModel = initCarModel;
  return that;
};

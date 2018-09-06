/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarController = function() {
  "use strict";

  var that = {};

  function initCarController(CarView, CarModel) {
    setStep1Listeners(CarView, CarModel);
    setStep2Listeners(CarView, CarModel);
  }

  function setStep1Listeners(CarView, CarModel) {
    //
  }

  function setStep2Listeners(CarView, CarModel) {
    let alterSlider = document.getElementById("alterSlider");
    alterSlider.oninput = function() {
      CarModel.updateAlter(this.value);
    }
    
    document.getElementById("platte").addEventListener("click",
    function() {CarModel.updateAlter(1998);} );

    document.getElementById("tape").addEventListener("click",
    function() {CarModel.updateAlter(2000);} );

    document.getElementById("cd").addEventListener("click",
    function() {CarModel.updateAlter(2002);} );

    document.getElementById("mp3").addEventListener("click",
    function() {CarModel.updateAlter(2004);} );

    document.getElementById("smartspeaker").addEventListener("click",
    function() {CarModel.updateAlter(2018);} );
  }

  that.initCarController = initCarController;
  return that;
};

/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarController = function() {
  "use strict";

  var that = {};

  function initCarController(CarView, CarModel) {
    setStep1Listeners(CarView, CarModel);
    setStep2Listeners(CarView, CarModel);
    setStep3Listeners(CarView, CarModel);
  }

  function setStep1Listeners(CarView, CarModel) {
    //
  }

  function setStep2Listeners(CarView, CarModel) {
    let alterSlider, alterOut;
    alterOut = document.getElementById("alterOut");
    alterSlider = document.getElementById("alterSlider");
    alterOut.innerHTML = alterSlider.value;

    alterSlider.oninput = function() {
      CarModel.updateAlter(this.value);
      alterOut.innerHTML = this.value;
    };

    document.getElementById("platte").addEventListener("click",
    function() {
      CarModel.updateAlter(1998);
      alterOut.innerHTML = 1998;
    } );

    document.getElementById("tape").addEventListener("click",
    function() {
      CarModel.updateAlter(2000);
      alterOut.innerHTML = 2000;
    } );

    document.getElementById("cd").addEventListener("click",
    function() {
      CarModel.updateAlter(2002);
      alterOut.innerHTML = 20002;
    } );

    document.getElementById("mp3").addEventListener("click",
    function() {
      CarModel.updateAlter(2004);
      alterOut.innerHTML = 2004;
    } );

    document.getElementById("smartspeaker").addEventListener("click",
    function() {
      CarModel.updateAlter(2018)
      alterOut.innerHTML = 2018;
      ;} );
  }

  function setStep3Listeners(CarView, CarModel) {
    let kmSlider, kmOut;
    kmOut = document.getElementById("kmOut");
    kmSlider = document.getElementById("kmSlider");
    kmOut.innerHTML = kmSlider.value;

    kmSlider.oninput = function() {
      CarModel.updateKm(this.value);
      kmOut.innerHTML = this.value;
    };

    document.getElementById("mars").addEventListener("click",
    function() {
      CarModel.updateKm(20);
      kmOut.innerHTML = 20;
    } );

    document.getElementById("erde").addEventListener("click",
    function() {
      CarModel.updateKm(40);
      kmOut.innerHTML = 40;
    } );

    document.getElementById("phobos").addEventListener("click",
    function() {
      CarModel.updateKm(70);
      kmOut.innerHTML = 70;
    } );

    document.getElementById("neptun").addEventListener("click",
    function() {
      CarModel.updateKm(155);
      kmOut.innerHTML = 155;
    } );
  }

  that.initCarController = initCarController;
  return that;
};

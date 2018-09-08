/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarController = function() {
  "use strict";

  var that = {};

  function initCarController(CarView, CarModel) {
    setStep1Listeners(CarView, CarModel);
    setStep2Listeners(CarView, CarModel);
    setStep3Listeners(CarView, CarModel);

    setStep5Listeners(CarView, CarModel);

    setStep7Listeners(CarView, CarModel);
  }

  function setStep1Listeners(CarView, CarModel) {
    //init Drag&Drop Listeners
    let pig = document.getElementById("piggybank"),
    fifeC = document.getElementById("money500"),
    oneK = document.getElementById("money1000"),
    fifeK = document.getElementById("money5000"),
    tenK = document.getElementById("money10000"),
    fiftyK = document.getElementById("money50000"),
    hundretK = document.getElementById("money100000"),
    moneyDeleteButton = document.getElementsByClassName("material-icons delete-button"),
    moneyBackButton = document.getElementsByClassName("material-icons replay-button");
    fifeC.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount",500);
    });
    oneK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount",1000);
    });
    fifeK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount",5000);
    });
    tenK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount",10000);
    });
    fiftyK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount",50000);
    });
    hundretK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount",100000);
    });
    pig.addEventListener("dragover", function(e){
      e.preventDefault();
    });
    pig.addEventListener("drop",function(e){
      //increase sum
      let amount= e.dataTransfer.getData("amount");
      CarModel.updateMoney(amount);
      //budget= document.getElementsByClassName("budget");
      //budget[0].innerHTML =parseInt(budget[0].innerHTML)+parseInt(amount);
      //console.log(parseInt(budget[0].innerHTML));
      //console.log("ERFOLGREISCH GEDROPPT MIT "+amount+"GELD!");
    });
    moneyDeleteButton[0].addEventListener("click", function() {
      CarModel.deleteMoney();
    });
    moneyBackButton[0].addEventListener("click", function() {
      CarModel.backMoney();
    });
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
      CarModel.updateAlter(2018);
      alterOut.innerHTML = 2018;
      } );
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

  function setStep5Listeners(CarView, CarModel) {
    let psSlider, psOut;
    psOut = document.getElementById("psOut");
    psSlider = document.getElementById("psSlider");
    psOut.innerHTML = psSlider.value;

    psSlider.oninput = function() {
      CarModel.updatePs(this.value);
      psOut.innerHTML = this.value;
    };

    document.getElementById("corsa").addEventListener("click",
    function() {
      CarModel.updatePs(75);
      psOut.innerHTML = 75;
    } );

    document.getElementById("bmw").addEventListener("click",
    function() {
      CarModel.updatePs(200);
      psOut.innerHTML = 200;
    } );

    document.getElementById("truck").addEventListener("click",
    function() {
      CarModel.updatePs(400);
      psOut.innerHTML = 400;
    } );
  }

  function setStep7Listeners(CarView, CarModel) {
    let verbrauchDecreaseButton = document.getElementsByClassName("material-icons remove-button"),
    verbrauchIncreaseButton = document.getElementsByClassName("material-icons add-button");

    verbrauchDecreaseButton[0].addEventListener("click", function() {
      CarModel.updateVerbrauch(-1);
      CarView.adjustDrop();
    });
    verbrauchIncreaseButton[0].addEventListener("click", function() {
      CarModel.updateVerbrauch(1);
      CarView.adjustDrop();
    });
  }

  that.initCarController = initCarController;
  return that;
};

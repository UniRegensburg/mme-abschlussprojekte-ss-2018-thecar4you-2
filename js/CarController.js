/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarController = function() {
  "use strict";

  var that = {},
    jahrPlatte = 1998,
    jahrTape = 2003,
    jahrCD = 2008,
    jahrMp3 = 2013,
    jahrSs = 2018,
    kmMars = 20,
    kmErde = 40,
    kmPhobos = 70,
    kmNeptun = 155,
    psCorsa = 75,
    psDreier = 200,
    psTruck = 400,
    conVerbrauch,
    conMoney;

  function initCarController(CarView, CarModel, CarDatabase) {
    setStartPageListener(CarView);
    setStep1Listeners(CarView, CarModel); //Preis
    setStep2Listeners(CarView, CarModel); //Alter
    setStep3Listeners(CarView, CarModel); //KM
    //Step 4 Listeners für Strecken im CanvasController
    setStep5Listeners(CarView, CarModel); //Leistung
    setStep6Listeners(CarView, CarModel); //Sitzplätze
    setStep7Listeners(CarView, CarModel); //Verbrauch
    setStep8Listeners(CarView, CarModel); //Kraftstoff
    setStep9Listeners(CarView, CarModel, CarDatabase); //Ergebnis
  }

  function setStartPageListener(CarView){
    let startButton = document.getElementsByClassName("start-button");
    startButton[0].addEventListener("click",function(){
      CarView.startWizard();
    });
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
      e.dataTransfer.setData("amount", 500);
    });
    oneK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount", 1000);
    });
    fifeK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount", 5000);
    });
    tenK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount", 10000);
    });
    fiftyK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount", 50000);
    });
    hundretK.addEventListener("dragstart", function(e){
      e.dataTransfer.setData("amount", 100000);
    });
    pig.addEventListener("dragover", function(e){
      e.preventDefault();
    });
    pig.addEventListener("drop",function(e){
      let amount= e.dataTransfer.getData("amount");
      conMoney = CarModel.updateMoney(amount);
      CarView.updateViewMoney(conMoney);
    });
    moneyDeleteButton[0].addEventListener("click", function() {
      conMoney = CarModel.deleteMoney();
      CarView.updateViewMoney(conMoney);
    });
    moneyBackButton[0].addEventListener("click", function() {
      conMoney = CarModel.backMoney();
      CarView.updateViewMoney(conMoney);
    });
  }

  function setStep2Listeners(CarView, CarModel) {
    let alterSlider, alterOut;
    alterOut = document.getElementById("alterOut");
    alterSlider = document.getElementById("alterSlider");
    alterOut.innerHTML = alterSlider.value;

    alterSlider.oninput = function() {
      CarModel.updateAlter(this.value);
      CarView.updateViewAlter(this.value);
    };

    document.getElementById("platte").addEventListener("click",
    function() {
      CarModel.updateAlter(jahrPlatte);
      CarView.updateViewAlter(jahrPlatte);
    } );

    document.getElementById("tape").addEventListener("click",
    function() {
      CarModel.updateAlter(jahrTape);
      CarView.updateViewAlter(jahrTape);
    } );

    document.getElementById("cd").addEventListener("click",
    function() {
      CarModel.updateAlter(jahrCD);
      CarView.updateViewAlter(jahrCD);
    } );

    document.getElementById("mp3").addEventListener("click",
    function() {
      CarModel.updateAlter(jahrMp3);
      CarView.updateViewAlter(jahrMp3);
    } );

    document.getElementById("smartspeaker").addEventListener("click",
    function() {
      CarModel.updateAlter(jahrSs);
      CarView.updateViewAlter(jahrSs);
      } );
  }

  function setStep3Listeners(CarView, CarModel) {
    let kmSlider, kmOut;
    kmOut = document.getElementById("kmOut");
    kmSlider = document.getElementById("kmSlider");
    kmOut.innerHTML = kmSlider.value;

    kmSlider.oninput = function() {
       CarModel.updateKm(this.value);
       CarView.updateViewKm(this.value);
    };

    document.getElementById("mars").addEventListener("click",
    function() {
      CarModel.updateKm(kmMars);
      CarView.updateViewKm(kmMars);
    } );

    document.getElementById("erde").addEventListener("click",
    function() {
      CarModel.updateKm(kmErde);
      CarView.updateViewKm(kmErde);
    } );

    document.getElementById("phobos").addEventListener("click",
    function() {
      CarModel.updateKm(kmPhobos);
      CarView.updateViewKm(kmPhobos);
    } );

    document.getElementById("neptun").addEventListener("click",
    function() {
      CarModel.updateKm(kmNeptun);
      CarView.updateViewKm(kmNeptun);
    } );
  }

  function setStep5Listeners(CarView, CarModel) {
    let psSlider, psOut;
    psOut = document.getElementById("psOut");
    psSlider = document.getElementById("psSlider");
    psOut.innerHTML = psSlider.value;

    psSlider.oninput = function() {
      CarModel.updatePs(this.value);
      CarView.updateViewPs(this.value);
    };

    document.getElementById("corsa").addEventListener("click",
    function() {
      CarModel.updatePs(psCorsa);
      CarView.updateViewPs(psCorsa);
    } );

    document.getElementById("bmw").addEventListener("click",
    function() {
      CarModel.updatePs(psDreier);
      CarView.updateViewPs(psDreier);
    } );

    document.getElementById("truck").addEventListener("click",
    function() {
      CarModel.updatePs(psTruck);
      CarView.updateViewPs(psTruck);
    } );
  }

  function setStep6Listeners(CarView, CarModel) {
    let seats2 = document.getElementsByClassName("material-icons two-seats-span"),
    seats5front = document.getElementsByClassName("material-icons five-seats-span-front"),
    seats5back = document.getElementsByClassName("material-icons five-seats-span-back"),
    seats7front = document.getElementsByClassName("material-icons seven-seats-span-front"),
    seats7middle = document.getElementsByClassName("material-icons seven-seats-span-middle"),
    seats7back = document.getElementsByClassName("material-icons seven-seats-span-back"),
    adultButton = document.getElementsByClassName("material-icons parent-icon")[0],
    childButton = document.getElementsByClassName("material-icons child-icon")[0],
    seatDelete = document.getElementsByClassName("material-icons delete_forever-button")[0],
    smallSeat1 = seats2[1],
    smallSeat2 = seats2[0],
    midSeat1 = seats5front[1],
    midSeat2 = seats5front[0],
    midSeat3 = seats5back[2],
    midSeat4 = seats5back[1],
    midSeat5 = seats5back[0],
    bigSeat1 = seats7front[1],
    bigSeat2 = seats7front[0],
    bigSeat3 = seats7middle[1],
    bigSeat4 = seats7middle[0],
    bigSeat5 = seats7back[2],
    bigSeat6 = seats7back[1],
    bigSeat7 = seats7back[0],
    seatArray=[smallSeat1, smallSeat2, midSeat1, midSeat2, midSeat3, midSeat4, midSeat5,
      bigSeat1, bigSeat2, bigSeat3, bigSeat4, bigSeat5, bigSeat6, bigSeat7];

    adultButton.addEventListener("dragstart", function(e) {
      e.dataTransfer.setData("type", "adult");
    });
    childButton.addEventListener("dragstart", function(e) {
      e.dataTransfer.setData("type", "child");
    });

    step6DragAndDrop(seatArray, CarView, CarModel);

    seatDelete.addEventListener("click", function() {
      CarModel.deleteSeats();
      CarView.deleteSeatPics(seatArray);
    });
  }

  function step6DragAndDrop(seatArray, CarView, CarModel) {
    let smallSeat1 = seatArray[0],
    smallSeat2 = seatArray[1],
    midSeat1 = seatArray[2],
    midSeat2 = seatArray[3],
    midSeat3 = seatArray[4],
    midSeat4 = seatArray[5],
    midSeat5 = seatArray[6],
    bigSeat1 = seatArray[7],
    bigSeat2 = seatArray[8],
    bigSeat3 = seatArray[9],
    bigSeat4 = seatArray[10],
    bigSeat5 = seatArray[11],
    bigSeat6 = seatArray[12],
    bigSeat7 = seatArray[13];

    smallSeat1.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    smallSeat1.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      if (type === "adult") {
        CarModel.updateSeat(2, 1, type);
        CarView.updateSeatPic(smallSeat1, type);
        for (let i=2; i<seatArray.length; i++) {
          CarView.deleteSeatSpan(seatArray[i]);
        }
      }
    });

    smallSeat2.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    smallSeat2.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(2, 2, type);
      CarView.updateSeatPic(smallSeat2, type);
      for (let i=2; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    midSeat1.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    midSeat1.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      if (type === "adult") {
        CarModel.updateSeat(5, 1, type);
        CarView.updateSeatPic(midSeat1, type);
        for (let i=0; i<2; i++) {
          CarView.deleteSeatSpan(seatArray[i]);
        }
        for (let i=7; i<seatArray.length; i++) {
          CarView.deleteSeatSpan(seatArray[i]);
        }
      }
    });

    midSeat2.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    midSeat2.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(5, 2, type);
      CarView.updateSeatPic(midSeat2, type);
      for (let i=0; i<2; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
      for (let i=7; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    midSeat3.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    midSeat3.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(5, 3, type);
      CarView.updateSeatPic(midSeat3, type);
      for (let i=0; i<2; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
      for (let i=7; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    midSeat4.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    midSeat4.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(5, 4, type);
      CarView.updateSeatPic(midSeat4, type);
      for (let i=0; i<2; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
      for (let i=7; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    midSeat5.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    midSeat5.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(5, 5, type);
      CarView.updateSeatPic(midSeat5, type);
      for (let i=0; i<2; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
      for (let i=7; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    bigSeat1.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    bigSeat1.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      if (type === "adult") {
        CarModel.updateSeat(7, 1, type);
        CarView.updateSeatPic(bigSeat1, type);
        for (let i=0; i<7; i++) { //evtl falsch
          CarView.deleteSeatSpan(seatArray[i]);
        }
      }
    });

    bigSeat2.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    bigSeat2.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 2, type);
      CarView.updateSeatPic(bigSeat2, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    bigSeat3.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    bigSeat3.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 3, type);
      CarView.updateSeatPic(bigSeat3, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    bigSeat4.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    bigSeat4.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 4, type);
      CarView.updateSeatPic(bigSeat4, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    bigSeat5.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    bigSeat5.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 5, type);
      CarView.updateSeatPic(bigSeat5, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    bigSeat6.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    bigSeat6.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 6, type);
      CarView.updateSeatPic(bigSeat6, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    bigSeat7.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    bigSeat7.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 7, type);
      CarView.updateSeatPic(bigSeat7, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });
  }

  function setStep7Listeners(CarView, CarModel) {
    let verbrauchDecreaseButton = document.getElementsByClassName("material-icons remove-button"),
    verbrauchIncreaseButton = document.getElementsByClassName("material-icons add-button");

    verbrauchDecreaseButton[0].addEventListener("click", function() {
      conVerbrauch = CarModel.updateVerbrauch(-1);
      CarView.adjustDrop(conVerbrauch);
    });
    verbrauchIncreaseButton[0].addEventListener("click", function() {
      conVerbrauch = CarModel.updateVerbrauch(1);
      CarView.adjustDrop(conVerbrauch);
    });
  }

  function setStep8Listeners(CarView, CarModel) {
    let benzinCheck = document.getElementById("benzinCheck"),
    dieselCheck = document.getElementById("dieselCheck");
    benzinCheck.addEventListener("click", function() {
      CarModel.updateFuel(benzinCheck.checked, dieselCheck.checked); // TODO: zwei fkt statt eine?
    });
    dieselCheck.addEventListener("click", function() {
      CarModel.updateFuel(benzinCheck.checked, dieselCheck.checked);
    });
    }

    function setStep9Listeners(CarView, CarModel, CarDatabase) {
      let ergButton = document.getElementById("ergButton"),
      empfButton = document.getElementById("EmpfehlungErgebnis"),
      preisButton = document.getElementById("PreisErgebnis"),
      psButton = document.getElementById("PSErgebnis"),
      verbrauchButton = document.getElementById("VerbrauchErgebnis"),
      alterButton = document.getElementById("AlterErgebnis");

      ergButton.addEventListener("click", function() {
        CarView.clearList();
        CarView.clearFuelRec();
        CarDatabase.wizardDone(CarModel,"empf");
      });
      empfButton = document.getElementById("EmpfehlungErgebnis");
      empfButton.addEventListener("click", function() {
        CarView.clearList();
        CarDatabase.wizardDone(CarModel,"empf");
      });
      preisButton = document.getElementById("PreisErgebnis");
      preisButton.addEventListener("click", function() {
        CarView.clearList();
        CarDatabase.wizardDone(CarModel,"preis");
      });
      psButton = document.getElementById("PSErgebnis");
      psButton.addEventListener("click", function() {
        CarView.clearList();
        CarDatabase.wizardDone(CarModel,"ps");
      });
      verbrauchButton = document.getElementById("VerbrauchErgebnis");
      verbrauchButton.addEventListener("click", function() {
        CarView.clearList();
        CarDatabase.wizardDone(CarModel,"verbrauch");
      });
      alterButton = document.getElementById("AlterErgebnis");
      alterButton.addEventListener("click", function() {
        CarView.clearList();
        CarDatabase.wizardDone(CarModel,"alter");
      });
    }

  that.initCarController = initCarController;
  return that;
};

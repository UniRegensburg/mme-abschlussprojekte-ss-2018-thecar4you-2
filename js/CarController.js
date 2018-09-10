/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarController = function() {
  "use strict";

  var that = {};

  function initCarController(CarView, CarModel) {
    setStartPageListener(CarView);
    setStep1Listeners(CarView, CarModel); //Preis
    setStep2Listeners(CarView, CarModel); //Alter
    setStep3Listeners(CarView, CarModel); //KM
    setStep4Listeners(CarView, CarModel); //Strecken
    setStep5Listeners(CarView, CarModel); //Leistung
    setStep6Listeners(CarView, CarModel); //Sitzplätze
    setStep7Listeners(CarView, CarModel); //Verbrauch
    setStep8Listeners(CarView, CarModel); //Kraftstoff
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
      alterOut.innerHTML = 2002;
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

  function setStep4Listeners(CarView, CarModel) {
    //TODO Drag&Drop Listener Setzen für die Distanz Icons
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
    seat2_1 = seats2[1],
    seat2_2 = seats2[0],
    seat5_1 = seats5front[1],
    seat5_2 = seats5front[0],
    seat5_3 = seats5back[2],
    seat5_4 = seats5back[1],
    seat5_5 = seats5back[0],
    seat7_1 = seats7front[1],
    seat7_2 = seats7front[0],
    seat7_3 = seats7middle[1],
    seat7_4 = seats7middle[0],
    seat7_5 = seats7back[2],
    seat7_6 = seats7back[1],
    seat7_7 = seats7back[0],
    seatArray=[seat2_1, seat2_2, seat5_1, seat5_2, seat5_3, seat5_4, seat5_5,
      seat7_1, seat7_2, seat7_3, seat7_4, seat7_5, seat7_6, seat7_7];

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
    let seat2_1 = seatArray[0],
    seat2_2 = seatArray[1],
    seat5_1 = seatArray[2],
    seat5_2 = seatArray[3],
    seat5_3 = seatArray[4],
    seat5_4 = seatArray[5],
    seat5_5 = seatArray[6],
    seat7_1 = seatArray[7],
    seat7_2 = seatArray[8],
    seat7_3 = seatArray[9],
    seat7_4 = seatArray[10],
    seat7_5 = seatArray[11],
    seat7_6 = seatArray[12],
    seat7_7 = seatArray[13];

    seat2_1.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat2_1.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      if (type === "adult") {
        CarModel.updateSeat(2, 1, type);
        CarView.updateSeatPic(seat2_1, type);
        for (let i=2; i<seatArray.length; i++) {
          CarView.deleteSeatSpan(seatArray[i]);
        }
      }
    });

    seat2_2.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat2_2.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(2, 2, type);
      CarView.updateSeatPic(seat2_2, type);
      for (let i=2; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat5_1.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat5_1.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      if (type === "adult") {
        CarModel.updateSeat(5, 1, type);
        CarView.updateSeatPic(seat5_1, type);
        for (let i=0; i<2; i++) {
          CarView.deleteSeatSpan(seatArray[i]);
        }
        for (let i=7; i<seatArray.length; i++) {
          CarView.deleteSeatSpan(seatArray[i]);
        }
      }
    });

    seat5_2.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat5_2.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(5, 2, type);
      CarView.updateSeatPic(seat5_2, type);
      for (let i=0; i<2; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
      for (let i=7; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat5_3.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat5_3.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(5, 3, type);
      CarView.updateSeatPic(seat5_3, type);
      for (let i=0; i<2; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
      for (let i=7; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat5_4.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat5_4.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(5, 4, type);
      CarView.updateSeatPic(seat5_4, type);
      for (let i=0; i<2; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
      for (let i=7; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat5_5.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat5_5.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(5, 5, type);
      CarView.updateSeatPic(seat5_5, type);
      for (let i=0; i<2; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
      for (let i=7; i<seatArray.length; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat7_1.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat7_1.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      if (type === "adult") {
        CarModel.updateSeat(7, 1, type);
        CarView.updateSeatPic(seat7_1, type);
        for (let i=0; i<7; i++) { //evtl falsch
          CarView.deleteSeatSpan(seatArray[i]);
        }
      }
    });

    seat7_2.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat7_2.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 2, type);
      CarView.updateSeatPic(seat7_2, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat7_3.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat7_3.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 3, type);
      CarView.updateSeatPic(seat7_3, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat7_4.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat7_4.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 4, type);
      CarView.updateSeatPic(seat7_4, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat7_5.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat7_5.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 5, type);
      CarView.updateSeatPic(seat7_5, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat7_6.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat7_6.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 6, type);
      CarView.updateSeatPic(seat7_6, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });

    seat7_7.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    seat7_7.addEventListener("drop", function(e) {
      let type = e.dataTransfer.getData("type");
      CarModel.updateSeat(7, 7, type);
      CarView.updateSeatPic(seat7_7, type);
      for (let i=0; i<7; i++) {
        CarView.deleteSeatSpan(seatArray[i]);
      }
    });
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

  that.initCarController = initCarController;
  return that;
};

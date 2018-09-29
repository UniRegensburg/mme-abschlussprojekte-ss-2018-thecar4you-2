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
  }

  function updateKm(alter) {
    savedKm = alter;
  }

  function updateMoney(money) {
    lastMoney = parseInt(money);
    savedMoney += lastMoney;
    return(savedMoney);
  }

  function deleteMoney() {
    savedMoney = 0;
    lastMoney = 0;
    return(savedMoney);
  }

  function backMoney() {
    savedMoney -= lastMoney;
    lastMoney = 0;
    return(savedMoney);
  }

  function calculateDist(iconArray) {
    let x = Math.abs(550/2 - iconArray[distIndex][1]),
    y = Math.abs(550/2 - iconArray[distIndex][2]),
    dist = Math.round(Math.sqrt(x*x + y*y)), //dist in pixeln
    distkm = distToKm(dist); //dist in km
    iconArray[distIndex].push(distkm);
    distArray.push(iconArray[distIndex]);
    distIndex +=1;
  }

  function distToKm(dist) {
    let km5 = 70,
    km10 = 130,
    km50 = 190,
    km100 = 250,
    out;
    if (dist <= km5) {
      out = (dist/km5)*5;
    } else if (dist <= km10) {
      out = 5+((dist-km5)/km10)*10;
    } else if (dist <= km50) {
      out = 10+((dist-km10)/km50)*125;
    } else if (dist > km50) {
      out = 50+((dist-km50)/km100)*200;
    }
    return out;
  }

  function clearDist() {
    distArray = [];
    distIndex = 0;
  }

  function updatePs(ps) {
    savedPs = ps;
  }

  function updateSeat(car, seat, type) {
    savedCarType = car; //2=small, 5=normal, 7=van
    savedSeats[seat-1][1] = type;
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
    let newVerbrauch = savedVerbrauch + parseInt(amount);

    if (newVerbrauch > 4 && newVerbrauch < 17) {
      savedVerbrauch = newVerbrauch;
    }

    return(savedVerbrauch);
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

    return(hardData);
  }

  function returnSoftData() {
    softData=[];
    softData.push(savedKm);
    softData.push(distArray);
    softData.push(savedCarType);
    softData.push(savedSeats);

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

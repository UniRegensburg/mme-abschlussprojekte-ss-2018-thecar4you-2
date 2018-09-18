/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarDatabase = function() {
  "use strict";

  var that = {},
  DbCarArray=[],
  hardData=[],
  softData=[],
  posCarArray=[];

	function initDB() { //unnütz?
    loadDbData();
  }

  function wizardDone(CarModel) {
    loadDbData();
    loadUserData(CarModel);
    getPossibleCars();
    console.log(posCarArray);
  }

  function loadDbData() {
    let smallArray=[];
    DbCarArray=[];
    smallArray.push("https://de.wikipedia.org/wiki/Alfa_Romeo_147","Alfa","Romeo 147" ,"['2000', '2010']","['kompaktklasse']","['kombilimousine']","[105, 250]","[101, 170]","[9, 6]","[500, 18500]");
    DbCarArray.push(smallArray);
    smallArray=[];
    smallArray.push("https://de.wikipedia.org/wiki/BMW_E46","BMW","E46" ,"['1998', '2007']","['mittelklasse', 'kompaktklasse']","['limousine', 'kombilimousine', 'kombi', 'coupe', 'cabriolet']","[105, 360]","[116, 204]","[9, 7]","[700, 28000]");
    DbCarArray.push(smallArray);
    smallArray=[];
    smallArray.push("https://de.wikipedia.org/wiki/Corvette_C7","Corvette","C7" ,"['seit 2013', 'pro']","['sportwagen']","['coupe', 'cabriolet']","[455, 765]","[0, 0]","[12, 0]","[50000, 70000]");
    DbCarArray.push(smallArray);
    smallArray=[];
    smallArray.push("https://de.wikipedia.org/wiki/BMW_E85","BMW","E85" ,"['2002', '2008']","['sportwagen']","['kombicoupe', 'roadster']","[150, 343]","[0, 0]","[10, 0]","[5000, 35000]");
    DbCarArray.push(smallArray);
  }

  function loadUserData(CarModel) {
    hardData = CarModel.returnHardData(); //preis, alter, ps, verbrauch, benzin, diesel
    softData = CarModel.returnSoftData(); //km, strecken, typ, sitze
  }

  function getPossibleCars() { //buggy
    posCarArray = [];
    for (let i=0; i<DbCarArray.length; i++) {
      let pMin = parseInt(getFirstIndex(DbCarArray[i][9]));
      if (hardData[0] >= pMin) { //fahrzeugpreis < budget
        let ageMax = getSecondIndex(DbCarArray[i][3]);
        if (ageMax === "pro" || parseInt(ageMax) >= hardData[1]) { //kfz max baujahr >= max bj
          let benzinMax = parseInt(getSecondIndex(DbCarArray[i][6])),
          dieselMax = parseInt(getSecondIndex(DbCarArray[i][7]));
          if ((hardData[2] <= benzinMax && hardData[4]) || (hardData[2] <= dieselMax && hardData[5])) { //kfz-ps > min user-ps
            adjustVerbrauch(i);
            checkVerbrauch(i);
          }
        }
      }
    }
    console.log(posCarArray);
    checkBodyTyp(); //unschön
  }

  function checkVerbrauch(index) {
    let verbrauchBenzin = parseInt(getFirstIndex(DbCarArray[index][8])),
    verbrauchDiesel = parseInt(getSecondIndex(DbCarArray[index][8]));
    if (hardData[4] && hardData[5]) { //benzin und diesel
      if (verbrauchBenzin <= hardData[3] || verbrauchDiesel <= hardData[3]) { //ein verbrauch <= user verbrauch
        posCarArray.push(DbCarArray[index]);
      }
    } else if (hardData[4]) { //benzin
        if (verbrauchBenzin <= hardData[3]) {
          posCarArray.push(DbCarArray[index]);
        }
    } else if (hardData[5]) { //diesel
        if (verbrauchDiesel <= hardData[3]) {
          posCarArray.push(DbCarArray[index]);
        }
    }
  }

  function adjustVerbrauch(index) {
    let benzinMax = parseInt(getSecondIndex(DbCarArray[index][6])),
    dieselMax = parseInt(getSecondIndex(DbCarArray[index][7])),
    benzinMin = parseInt(getFirstIndex(DbCarArray[index][6])),
    dieselMin = parseInt(getFirstIndex(DbCarArray[index][7])),
    benzinFaktor = 1,
    dieselFaktor = 1;

    if (hardData[2] >= benzinMin) { //realistisch halten, 200ps min, corvette avg 550ps, min 400, faktor = 0,3x und corvette verbrauch = 4-5l
      benzinFaktor = hardData[2] / ((benzinMax+benzinMin)/2);
    }
    if (hardData[2] >= dieselMin) {
      dieselFaktor = hardData[2] / ((dieselMax+dieselMin)/2);
    }

    let altBenzin = parseInt(getFirstIndex(DbCarArray[index][8])),
    altDiesel = parseInt(getSecondIndex(DbCarArray[index][8])),
    neuBenzin = parseInt(benzinFaktor * altBenzin), //combine nicht mgl, weil if abfrage nötig ist
    neuDiesel = parseInt(dieselFaktor * altDiesel),
    neuerVerbrauch = "["+neuBenzin+", "+neuDiesel+"]"; //muss mit '' sein
    DbCarArray[index][8] = neuerVerbrauch;
  }

  function checkBodyTyp() {
    let tempArray = posCarArray;
    posCarArray = [];
    //console.log(softData[2]);
    for (let i = 0; i<tempArray.length; i++) {
      if (softData[2] === 2) {
        if (tempArray[i][4].includes("sportwagen") || tempArray[i][5].includes("cabriolet") || tempArray[i][5].includes("roadster")) {
          posCarArray.push(tempArray[i]);
        }
      } else if (softData[2] === 5) {
        posCarArray.push(tempArray[i]);
      } else if (softData[2] === 7) {
        if (tempArray[i][4].includes("van") || tempArray[i][4].includes("suv")) {
          posCarArray.push(tempArray[i]);
        }
      }
    }
  }

/*
verbrauch nach update: kfz max ps - kfz min ps (für kraftstoff)
d1 = user min ps / kfz avg
verbrauchupdate = d1* avg verbrauch für kraftstoff <- adjustVerbrauch

km + ps + baujahr (im vgl zu produktionszeit): auswirkung auf preis // TODO: schwer / ungenau, weil zustand etc

(strecken: viel lang -> diesel mehr wertung) - wenn wir werten?

klasse und karosse <- checkBodyTyp
soft typ: 2,5,7
2: klasse = sportwagen oder karo = cabriolet, roadster (cabrio, roadster teurer?)
5: alles
7: klasse = van, suv

soft sitze: eig egal?
*/

  function getFirstIndex(arrString) {
    let min = arrString.split(", ")[0];
    min = min.replace("[", "");
    min = min.replace("'", "");
    min = min.replace("'", ""); //weil eine zeile nur eins replaced
    return(min);
  }

  function getSecondIndex(arrString) {
    let max = arrString.split(", ")[1];
    max = max.replace("]", "");
    max = max.replace("'", "");
    max = max.replace("'", ""); //weil eine zeile nur eins replaced
    return(max);
  }

  that.initDB = initDB;
  that.wizardDone = wizardDone;
  return that;
};

/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarDatabase = function() {
  "use strict";

  var that = {},
  DbCarArray=[],
  hardData=[],
  softData=[],
  posCarArray=[];

	function initDB() {
    loadDbData();
  }

  function wizardDone(CarModel) {
    loadUserData(CarModel);
    getPossibleCars();
    console.log(posCarArray);
  }

  function loadDbData() {
    let smallArray=[];
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
    //console.log(DbCarArray[0]); //id, marke, typ, bj, klasse, karo, benzin, diesel, verbrauch, preis
  }

  function loadUserData(CarModel) {
    hardData = CarModel.returnHardData(); //preis, alter, ps, verbrauch, benzin, diesel
    softData = CarModel.returnSoftData(); //km, strecken, typ, sitze
  }

  function getPossibleCars() {
    posCarArray=[];
    for (let i=0; i<DbCarArray.length; i++) {
      let pMin = parseInt(getFirstIndex(DbCarArray[i][9]));
      if (hardData[0] >= pMin) { //fahrzeugpreis < budget
        let ageMax = getSecondIndex(DbCarArray[i][3]);
        //console.log(ageMax)
        if (ageMax === "pro" || parseInt(ageMax) >= hardData[1]) { //baujahr >= max bj
          //console.log(i);
          let benzinMax = parseInt(getSecondIndex(DbCarArray[i][6])),
          dieselMax = parseInt(getSecondIndex(DbCarArray[i][7]));
          if ((hardData[2] <= benzinMax && hardData[4]) || (hardData[2] <= dieselMax && hardData[5])) { //kfz-ps > min user-ps
            let verbrauchBenzin = parseInt(getFirstIndex(DbCarArray[i][8])),
            verbrauchDiesel = parseInt(getSecondIndex(DbCarArray[i][8]));
            if (hardData[4] && hardData[5]) { //benzin und diesel
              if (verbrauchBenzin <= hardData[3] || verbrauchDiesel <= hardData[3]) { //ein verbrauch <= user verbrauch
                posCarArray.push(DbCarArray[i]);
              }
            } else if (hardData[4]) { //benzin
              if (verbrauchBenzin <= hardData[3]) {
                posCarArray.push(DbCarArray[i]);
              }
            } else if (hardData[5]) { //diesel
              if (verbrauchDiesel <= hardData[3]) {
                posCarArray.push(DbCarArray[i]);
              }
            }
          }
        }
      }
    }
  }

  function getFirstIndex(arrString) {
    let min = arrString.split(", ")[0];
    min = min.replace("[", "");
    min = min.replace("'", "");
    min = min.replace("'", ""); //weil eine zeile nur eins replaced
    //min = parseInt(min);
    return(min);
  }

  function getSecondIndex(arrString) {
    let max = arrString.split(", ")[1];
    max = max.replace("]", "");
    max = max.replace("'", "");
    max = max.replace("'", ""); //weil eine zeile nur eins replaced
    //max = parseInt(max);
    return(max);
  }

  that.initDB = initDB;
  that.wizardDone = wizardDone;
  return that;
};

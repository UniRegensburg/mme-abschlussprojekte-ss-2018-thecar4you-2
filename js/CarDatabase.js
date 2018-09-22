/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarDatabase = function() {
  "use strict";

  var that = {},
  DbCarArray=[],
  hardData=[],
  softData=[],
  //CarView, //eslint fehler mit this und that
  posCarArray=[],
  db;
  function connect(url, database, user, password) {

    let dbUrl = "http://" + ( user + ":" || "") + (password + "@" || "") + url + "/" + database;

    db = new PouchDB(dbUrl );

}



function getInfo() {

    db.info().then(function (info) {

                   console.log(info);

    });

}
connect("132.199.137.35:5984", "car4you", "car4you", "car2018***");
getInfo();
db.allDocs().then(function(result){
  console.log(result);
});

  /*let localDB = new PouchDB("localDB");
localDB.put({
  _id: 'dave@gmail.com',
  name: 'David',
  age: 69,
});
db.changes().on('change', function() {
  console.log('Ch-Ch-Changes');
});

db.replicate.to('http://132.199.137.35:5984/car4you');*/

	function initDB(CarView) { //unnütz?
    loadDbData();
    that.CarView = CarView; //that und this mgl?
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
    smallArray.push("https://de.wikipedia.org/wiki/Corvette_C7","Corvette","C7" ,"['2013', 'pro']","['sportwagen']","['coupe', 'cabriolet']","[455, 765]","[0, 0]","[12, 0]","[50000, 70000]");
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
      let calcPrice = adjustPrice(i);
      //let pMin = parseInt(getFirstIndex(DbCarArray[i][9]));
      // TODO: was ^ ist besser?
      if (hardData[0] >= calcPrice) { //fahrzeugpreis < budget - alt (pMin in if für calcPrice);;; neu: checked auf ca preis
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
    //console.log(posCarArray);
    checkBodyTyp(); //unschön
    createMobileLink();
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
    dieselFaktor = 1,
    altBenzin,
    altDiesel,
    neuBenzin,
    neuDiesel,
    neuerVerbrauch;

    if (hardData[2] >= benzinMin) { //realistisch halten, 200ps min, corvette avg 550ps, min 400, faktor = 0,3x und corvette verbrauch = 4-5l
      benzinFaktor = hardData[2] / ((benzinMax+benzinMin)/2);
    }
    if (hardData[2] >= dieselMin) {
      dieselFaktor = hardData[2] / ((dieselMax+dieselMin)/2);
    }

    altBenzin = parseInt(getFirstIndex(DbCarArray[index][8]));
    altDiesel = parseInt(getSecondIndex(DbCarArray[index][8]));
    neuBenzin = parseInt(benzinFaktor * altBenzin);
    neuDiesel = parseInt(dieselFaktor * altDiesel);
    neuerVerbrauch = "["+neuBenzin+", "+neuDiesel+"]";
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

  function adjustPrice(index) {
    let benzinMax = parseInt(getSecondIndex(DbCarArray[index][6])),
    dieselMax = parseInt(getSecondIndex(DbCarArray[index][7])),
    benzinMin = parseInt(getFirstIndex(DbCarArray[index][6])),
    dieselMin = parseInt(getFirstIndex(DbCarArray[index][7])),
    benzinFaktor = 1,
    dieselFaktor = 1,
    psFaktor = 1,
    baujahrMin = parseInt(getFirstIndex(DbCarArray[index][3])),
    baujahrMax = getSecondIndex(DbCarArray[index][3]),
    bjFaktor = 1,
    kmFaktor = 1,
    preisFaktor = 0,
    lowPrice = parseInt(getFirstIndex(DbCarArray[index][9])),
    highPrice = parseInt(getSecondIndex(DbCarArray[index][9])),
    avgPrice = (2*lowPrice+highPrice)/3,
    calcPrice;

    //console.log(benzinMin);
    if (hardData[2] >= benzinMin && benzinMin > 0) { //realistisch halten, 200ps min, corvette avg 550ps, min 400, faktor = 0,3x und corvette verbrauch = 4-5l
      benzinFaktor = hardData[2] / ((benzinMax+benzinMin)/2);
      //console.log("benz");
      //console.log(benzinFaktor);
    }
    //console.log(dieselMin);
    if (hardData[2] >= dieselMin && dieselMin > 0) {
      dieselFaktor = hardData[2] / ((dieselMax+dieselMin)/2);
      //console.log("diesel");
      //console.log(dieselFaktor);
    }
    psFaktor = (benzinFaktor+dieselFaktor)/2;
    //console.log("ps");
    //console.log(psFaktor);

    if (baujahrMax === "pro") {
      baujahrMax = 2018;
    } else {
      baujahrMax = parseInt(baujahrMax);
    }
    //console.log(baujahrMax);
    if (baujahrMin < 1998) { //fängt buggy csv ab
      baujahrMin = baujahrMax - 10;
    }
    //console.log(baujahrMin);
    bjFaktor = ((hardData[1]-1950) / (((baujahrMax+baujahrMin)/2)-1950)); // abzug um wirkung zu erhöhen
    //problem: hier differenz bei älteren baujahren -> größere faktor, echt: andersrum
    //console.log("bj");
    //console.log(bjFaktor);

    kmFaktor = ((2018-hardData[1])*10000) / (softData[0]*1000);
    //console.log("km");
    //console.log(kmFaktor);

    preisFaktor = (2*psFaktor + 2*bjFaktor + kmFaktor) / 3; //mit faktoren spielen
    //console.log(preisFaktor);

    calcPrice = preisFaktor*avgPrice;

    return(calcPrice);
  }

/*
verbrauch nach update: kfz max ps - kfz min ps (für kraftstoff)
d1 = user min ps / kfz avg
verbrauchupdate = d1* avg verbrauch für kraftstoff <- adjustVerbrauch

km + ps + baujahr (im vgl zu produktionszeit): auswirkung auf preis // TODO: schwer / ungenau, weil zustand etc - buggy
ps und bj wie verbrauch, km: wenn mehr als 10k/jahr billiger, sonst mehr?

(strecken: viel lang -> diesel mehr wertung) - wenn wir werten?

klasse und karosse <- checkBodyTyp
soft typ: 2,5,7
2: klasse = sportwagen oder karo = cabriolet, roadster (cabrio, roadster teurer?)
5: alles
7: klasse = van, suv

soft sitze: eig egal?
*/

  function createMobileLink() {
    let preis = hardData[0],
    bj = hardData[1],
    ps = hardData[2],
    verbrauch = hardData[3],
    benzin = hardData[4],
    diesel = hardData[5],
    km = softData[0]*1000,
    typ = softData[2],
    str="";

    if (typ === 5) {
      if (benzin && diesel) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?damageUnrepaired=NO_DAMAGE_UNREPAIRED&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      } else if (benzin) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?damageUnrepaired=NO_DAMAGE_UNREPAIRED&fuels=PETROL&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      } else if (diesel) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?damageUnrepaired=NO_DAMAGE_UNREPAIRED&fuels=DIESEL&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      }
    } else if (typ === 7) {
      if (benzin && diesel) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?categories=OffRoad&categories=Van&damageUnrepaired=NO_DAMAGE_UNREPAIRED&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      } else if (benzin) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?categories=OffRoad&categories=Van&damageUnrepaired=NO_DAMAGE_UNREPAIRED&fuels=PETROL&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      } else if (diesel) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?categories=OffRoad&categories=Van&damageUnrepaired=NO_DAMAGE_UNREPAIRED&fuels=DIESEL&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      }
    } else if (typ === 2) {
      if (benzin && diesel) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?categories=Cabrio&categories=SportsCar&damageUnrepaired=NO_DAMAGE_UNREPAIRED&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      } else if (benzin) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?categories=Cabrio&categories=SportsCar&damageUnrepaired=NO_DAMAGE_UNREPAIRED&fuels=PETROL&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      } else if (diesel) {
        str = "https://suchen.mobile.de/fahrzeuge/search.html?categories=Cabrio&categories=SportsCar&damageUnrepaired=NO_DAMAGE_UNREPAIRED&fuels=DIESEL&isSearchRequest=true&maxConsumptionCombined="+verbrauch+"&maxMileage="+km+"&maxPrice="+preis+"&minFirstRegistrationDate="+bj+"&minHu=3&minPowerAsArray="+ps+"&minPowerAsArray=PS&readyToDrive=ONLY_READY_TO_DRIVE&scopeId=C";
      }
    }

    that.CarView.setErgLink(str); //nur that

    //console.log(str);
    return(str);
  }

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

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
  db,
  sortType = "empf",
  kmMulti = 10000,
  year = 2018,
  bjOffset = 10, //alte formel 1950
  dieselCount=0,
  benzinCount=0,
  recDiesel = false,
  empfArray=[];

  function connect(url, database, user, password) {

      let dbUrl = "http://" + ( user + ":" || "") + (password + "@" || "") + url + "/" + database;

      db = new PouchDB(dbUrl );

  }

function getInfo() {

    db.info().then(function (info) {

                   //console.log(info);

    });

}
connect("132.199.137.35:5984", "car4you", "car4you", "car2018***");
getInfo();
db.allDocs({
  include_docs: true,
  attachments: true,
}).then(function(result){
  DbCarArray = result.rows;
  console.log(DbCarArray[0].doc);

});
function deleteDBElement(id){
      db.get(id).then(function(doc){
        return db.remove(doc);
      });
}
function deleteWholeDB(){
  db.allDocs().then(function(result){
    for (let i =0;i<result.rows.length;i++){
      console.log(result.rows[i].id);
      deleteDBElement(result.rows[i].id);
    }
  });
}

db.get("https://de.wikipedia.org/wiki/%C5%A0koda_Fabia_I").then(function(doc){
  console.log(doc);
});
function fillDB(docs){
  for(let i=0;i<docs.length;i++){
    console.log(docs[i]);
    db.put(docs[i]);
  }
}

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
    //loadDbData();
    that.CarView = CarView; //that und this mgl?
  }

  function wizardDone(CarModel,sortBy) {
    connect("132.199.137.35:5984", "car4you", "car4you", "car2018***");
    getInfo();
    db.allDocs({
      include_docs: true,
      attachments: true,
    }).then(function(result){
      DbCarArray = result.rows;
      //console.log(DbCarArray[0].doc);

    });
    //loadDbData();
    loadUserData(CarModel);
    getPossibleCars();
    empfehlung();
    console.log(empfArray);
    switch (sortBy) {
      case "empf":
        sortResult();
        console.log(empfArray);
        break;
      case "preis":
        preisErg();
        break;
      case "ps":
        psErg();
        break;
      case "verbrauch":
        verbrauchErg();
        break;
      case "alter":
        alterErg();
        break;
      default:
        sortResult();
    }
    console.log(empfArray);
    createMobileLink();
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
    //console.log(softData[1]);
  }

  function getPossibleCars() { //buggy
    posCarArray = [];
    for (let i=0; i<DbCarArray.length; i++) {
      let calcPrice = adjustPrice(i);
      //let pMin = parseInt(DbCarArray[i].doc.preis[0]);
      // TODO: was ^ ist besser?
      if (hardData[0] >= calcPrice && calcPrice > 0) { //fahrzeugpreis < budget - alt (pMin in if für calcPrice);;; neu: checked auf ca preis
        parseAge(i);
        //let ageMax = getSecondIndex(DbCarArray[i].doc.bau);
        let ageMax = DbCarArray[i].doc.bau[1];
        if (ageMax === "pro" || parseInt(ageMax) >= hardData[1]) { //kfz max baujahr >= max bj
          let benzinMax = DbCarArray[i].doc.benzin[1],
          dieselMax = DbCarArray[i].doc.diesel[1];
          if ((hardData[2] <= benzinMax && hardData[4]) || (hardData[2] <= dieselMax && hardData[5])) { //kfz-ps > min user-ps
            adjustVerbrauch(i);
            checkVerbrauch(i);
          }
        }
      }
    }
    //console.log(posCarArray);
    checkBodyTyp(); //unschön
  }

  function parseAge(index) {
    let org = DbCarArray[index].doc.bau,
    baustart = parseInt(getFirstIndex(org)),
    bauende = getSecondIndex(org),
    list=[];

    if (bauende === "pro") {
      bauende = year;
    } else {
      bauende = parseInt(bauende);
    }

    list.push(baustart);
    list.push(bauende);
    DbCarArray[index].doc.bau = list;
  }

  function checkVerbrauch(index) {
    let verbrauchBenzin = DbCarArray[index].doc.verbrauch[0],
    verbrauchDiesel = DbCarArray[index].doc.verbrauch[1];
    if (hardData[4] && hardData[5]) { //benzin und diesel
      if ((verbrauchBenzin > 0 && verbrauchBenzin <= hardData[3]) || (verbrauchDiesel > 0 && verbrauchDiesel <= hardData[3])) { //ein verbrauch <= user verbrauch
        posCarArray.push(DbCarArray[index].doc);
      }
    } else if (hardData[4]) { //benzin
        if (verbrauchBenzin > 0 && verbrauchBenzin <= hardData[3]) {
          posCarArray.push(DbCarArray[index].doc);
        }
    } else if (hardData[5]) { //diesel
        if (verbrauchDiesel > 0 && verbrauchDiesel <= hardData[3]) {
          posCarArray.push(DbCarArray[index].doc);
        }
    }
  }

  function adjustVerbrauch(index) {
    let benzinMax = DbCarArray[index].doc.benzin[1],
    dieselMax = DbCarArray[index].doc.diesel[1],
    benzinMin = DbCarArray[index].doc.benzin[0],
    dieselMin = DbCarArray[index].doc.diesel[0],
    benzinFaktor = 1,
    dieselFaktor = 1,
    altBenzin,
    altDiesel,
    neuBenzin,
    neuDiesel;

    if (hardData[2] >= benzinMin && benzinMin > 0) { //realistisch halten, 200ps min, corvette avg 550ps, min 400, faktor = 0,3x und corvette verbrauch = 4-5l
      benzinFaktor = hardData[2] / ((benzinMax+benzinMin)/2);
    }
    if (hardData[2] >= dieselMin && dieselMin > 0) {
      dieselFaktor = hardData[2] / ((dieselMax+dieselMin)/2);
    }

    altBenzin = DbCarArray[index].doc.verbrauch[0];
    altDiesel = DbCarArray[index].doc.verbrauch[1];
    neuBenzin = Math.round((benzinFaktor * altBenzin)*100)/100;
    neuDiesel = Math.round((dieselFaktor * altDiesel)*100)/100;
    DbCarArray[index].doc.verbrauch[0] = neuBenzin;
    DbCarArray[index].doc.verbrauch[1] = neuDiesel;
  }

  function checkBodyTyp() {
    let tempArray = posCarArray;
    posCarArray = [];
    //console.log(softData[2]);
    for (let i = 0; i<tempArray.length; i++) {
      if (softData[2] === 2) {
        if (tempArray[i].klasse.includes("sportwagen") || tempArray[i].karosserie.includes("cabriolet") || tempArray[i].karosserie.includes("roadster")) {
          posCarArray.push(tempArray[i]);
        }
      } else if (softData[2] === 5) {
          posCarArray.push(tempArray[i]);
      } else if (softData[2] === 7) {
          if (tempArray[i].klasse.includes("van") || tempArray[i].klasse.includes("suv")) {
            posCarArray.push(tempArray[i]);
          }
      }
    }
  }

  function adjustPrice(index) {
    //console.log(DbCarArray[index].doc);
    let benzinMax = DbCarArray[index].doc.benzin[1],
    dieselMax = DbCarArray[index].doc.diesel[1],
    benzinMin = DbCarArray[index].doc.benzin[0],
    dieselMin = DbCarArray[index].doc.diesel[0],
    benzinFaktor = 1,
    dieselFaktor = 1,
    psFaktor = 1,
    //baujahrMin = parseInt(getFirstIndex(DbCarArray[index].doc.bau)),
    //baujahrMax = getSecondIndex(DbCarArray[index].doc.bau),
    baujahrMin = DbCarArray[index].doc.bau[0],
    baujahrMax = DbCarArray[index].doc.bau[1],
    bjFaktor = 1,
    kmFaktor = 1,
    preisFaktor = 0,
    lowPrice = DbCarArray[index].doc.preis[0],
    highPrice = DbCarArray[index].doc.preis[1],
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
    /*
    if (baujahrMax === "pro") {
      baujahrMax = year;
    } else {
      baujahrMax = parseInt(baujahrMax);
    }
    */
    //console.log(baujahrMax);
    if (baujahrMin < 1998) { //fängt buggy csv ab
      baujahrMin = baujahrMax - 10;
    }
    //console.log(baujahrMin);
    if (baujahrMin <= hardData[1]) {
      //let bjFaktor2 = ((hardData[1]-1950) / (((baujahrMax+baujahrMin)/2)-1950)); // abzug um wirkung zu erhöhen
      bjFaktor = ((year-((baujahrMax+baujahrMin)/2)+bjOffset) / ((year-hardData[1])+bjOffset)); //hohe werte für alte autos bei neuem bj, werden aber eh aussortiert
      //console.log(bjFaktor2);
      //console.log(bjFaktor);
      //TODO: 2018-bj für größeren faktor bei neueren autos ^ gemacht
      //problem: hier differenz bei älteren baujahren -> größere faktor, echt: andersrum - fixed
      //console.log("bj");
      //console.log(bjFaktor);
    }

    if (hardData[1]<year) {
      kmFaktor = ((year-hardData[1])*kmMulti) / (softData[0]*kmMulti);
      //console.log("km");
      //console.log(kmFaktor);
    }

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

ausgabe:
unsere empfehlung (max ps, bj, bei min verbrauch und km an preisgrenze) <- werten
während pos price < max (=pos autos)= (2*(max ps / user min + user / adjustetenverbauch + max bj / user) + 1/kmfatkor aus preis)/7 = float, sort max  //km so rum?
^^viel strecken -> diesel

min preis, min verbrauch, max bj, max ps <- 4 fkt

max 10 erg - fkt die erg array bekomtm und ausgibt
drunter link
*/

  function createMobileLink() {
    let preis = hardData[0],
    bj = hardData[1],
    ps = hardData[2],
    verbrauch = hardData[3],
    benzin = hardData[4],
    diesel = hardData[5],
    km = softData[0]*1000, //100 entspricht 100.000km
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

    that.CarView.setErgLink(str,empfArray); //nur that

    //console.log(str);
    return(str);
  }

  function empfehlung() {
    //unsere empfehlung (max ps, bj, bei min verbrauch und km an preisgrenze) <- werten
    //während pos price < max (=pos autos)= (2*(max ps / user min + user / adjustetenverbauch + max bj / user) + 1/kmfatkor aus preis)/7 = float, sort max  //km so rum?
    //^^viel strecken -> diesel - passt
    let userPs = parseInt(hardData[2]),
    userVerbrauch = hardData[3],
    userbj = hardData[1];
    sortType = "empf";
    console.log("empf");
    benzinCount = 0;
    dieselCount = 0;
    empfArray = [];
    recDiesel = false;

    if (hardData[2] > 300) {
      benzinCount += 1;
    }
    for (let i = 0; i<softData[1].length; i++) {
      if ((softData[1][i][0].includes("G") && softData[1][i][3]>50) || (softData[1][i][0].includes("Y") && softData[1][i][3]>80)) {
        dieselCount += 1;
      }
    }
    if (benzinCount > dieselCount) {
      //console.log("benzin");
    } else if (dieselCount > benzinCount) {
      //console.log("diesel");
      recDiesel = true;
    }

    if (!recDiesel) {
      for (let i = 0; i<posCarArray.length; i++) {
        let adjustedVerbrauch = posCarArray[i].verbrauch[0],
        bps = posCarArray[i].benzin[0],
        empfFaktor=0,
        list=[];
        if (adjustedVerbrauch > 0 && bps > 0) {
          empfFaktor = recBenzinTrue(adjustedVerbrauch, posCarArray[i], userPs, userbj, userVerbrauch);
          list.push(posCarArray[i]);
          list.push(empfFaktor);
          empfArray.push(list);
        }
      }
    } else if (recDiesel) {
      for (let i = 0; i<posCarArray.length; i++) {
        let adjustedVerbrauch = posCarArray[i].verbrauch[1],
        dps = posCarArray[i].diesel[0],
        empfFaktor=0,
        list=[];
        if (adjustedVerbrauch > 0 && dps > 0) {
          empfFaktor = recDieselTrue(adjustedVerbrauch, posCarArray[i], userPs, userbj, userVerbrauch);
          list.push(posCarArray[i]);
          list.push(empfFaktor);
          empfArray.push(list);
        }
      }
    }
    console.log(empfArray);
  }
  function sortResult(){
    empfArray.sort(function(a,b){
      return b[1]-a[1];
    });
  }

  function recBenzinTrue(adverbrauch, entry, userPs, userbj, userVerbrauch) {
    let benzinMax = entry.benzin[1],
    //baujahrMax = getSecondIndex(entry.bau),
    baujahrMax = entry.bau[1],
    empfFaktor=0;
    /*
    if (baujahrMax === "pro") {
      baujahrMax = year;
    } else {
      baujahrMax = parseInt(baujahrMax);
    }
    */
    empfFaktor = (benzinMax/userPs + userVerbrauch/adverbrauch + baujahrMax/userbj)/3;
    return(empfFaktor);
  }

  function recDieselTrue(adverbrauch, entry, userPs, userbj, userVerbrauch) {
    let dieselMax = entry.diesel[1],
    baujahrMax = entry.bau[1],
    empfFaktor=0;
    /*
    if (baujahrMax === "pro") {
      baujahrMax = year;
    } else {
      baujahrMax = parseInt(baujahrMax);
    }
    */
    empfFaktor = (dieselMax/userPs + userVerbrauch/adverbrauch + baujahrMax/userbj)/3;
    return(empfFaktor);
  }

  function preisErg() {
    empfArray.sort(function(a,b){
      return a[0].preis[0]-b[0].preis[0];
    });

  }

  function psErg() {
    empfArray.sort(function(a,b){
      return b[0].benzin[1]-a[0].benzin[1];
    });
  }

  function verbrauchErg() {
    empfArray.sort(function(a,b){
      return a[0].verbrauch[0]-b[0].verbrauch[0];
    });
  }

  function alterErg() {
    empfArray.sort(function(a,b){
      return b[0].bau[1]-a[0].bau[1];
    });
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
  that.empfehlung = empfehlung;
  that.preisErg = preisErg;
  that.psErg = psErg;
  that.verbrauchErg = verbrauchErg;
  that.alterErg = alterErg;
  that.wizardDone = wizardDone;
  return that;
};

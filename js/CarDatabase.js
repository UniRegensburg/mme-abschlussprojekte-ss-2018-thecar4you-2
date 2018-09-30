/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarDatabase = function() {
  "use strict";

  var that = {},
  DbCarArray=[],
  hardData=[],
  softData=[],
  posCarArray=[],
  db,
  kmMulti = 10000,
  year = 2018,
  bjOffset = 10,
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
  });
  /*
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
  */

	function initDB(CarView) { //unnütz?
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
    loadUserData(CarModel);
    getPossibleCars();
    empfehlung();
    switch (sortBy) {
      case "empf":
        sortResult();
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
    
    show(empfArray,createMobileLink(),sortBy);
	that.CarView.setResultBorder();
  }
  function show(empfArray,str,sort){
    that.CarView.setErgLink(str,empfArray,sort); //nur that
  }

  function loadUserData(CarModel) {
    hardData = CarModel.returnHardData(); //preis, alter, ps, verbrauch, benzin, diesel
    softData = CarModel.returnSoftData(); //km, strecken, typ, sitze
  }

  function getPossibleCars() { //buggy
    posCarArray = [];
    for (let i=0; i<DbCarArray.length; i++) {
      let calcPrice = adjustPrice(i);
      if (hardData[0] >= calcPrice && calcPrice > 0) { //user max preis >= errechneten preis für fahrzeug
        parseAge(i);
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
    checkBodyTyp();
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
    let benzinMax = DbCarArray[index].doc.benzin[1],
    dieselMax = DbCarArray[index].doc.diesel[1],
    benzinMin = DbCarArray[index].doc.benzin[0],
    dieselMin = DbCarArray[index].doc.diesel[0],
    benzinFaktor = 1,
    dieselFaktor = 1,
    psFaktor = 1,
    baujahrMin = DbCarArray[index].doc.bau[0],
    baujahrMax = DbCarArray[index].doc.bau[1],
    bjFaktor = 1,
    kmFaktor = 1,
    preisFaktor = 0,
    lowPrice = DbCarArray[index].doc.preis[0],
    highPrice = DbCarArray[index].doc.preis[1],
    avgPrice = (2*lowPrice+highPrice)/3,
    calcPrice,
    list=[];

    if (hardData[2] >= benzinMin && benzinMin > 0) { //realistisch halten, 200ps min, corvette avg 550ps, min 400, faktor = 0,3x
      benzinFaktor = hardData[2] / ((benzinMax+benzinMin)/2);
    }
    if (hardData[2] >= dieselMin && dieselMin > 0) {
      dieselFaktor = hardData[2] / ((dieselMax+dieselMin)/2);
    }
    psFaktor = (benzinFaktor+dieselFaktor)/2;

    if (baujahrMin <= hardData[1]) {
      bjFaktor = ((year-((baujahrMax+baujahrMin)/2)+bjOffset) / ((year-hardData[1])+bjOffset)); //hohe werte für alte autos bei neuem bj, werden aber aussortiert
    }

    if (hardData[1]<year) {
      kmFaktor = ((year-hardData[1])*kmMulti) / (softData[0]*kmMulti);
    }

    preisFaktor = (2*psFaktor + 2*bjFaktor + kmFaktor) / 3; // geteilt durch 3 für mehr auswirkung

    calcPrice = Math.round(preisFaktor*avgPrice);

    list.push(lowPrice);
    list.push(highPrice);
    list.push(calcPrice);
    DbCarArray[index].doc.preis = list;

    return(calcPrice);
  }

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

    that.CarView.setErgLink(str,empfArray);

    return(str);
  }

  function empfehlung() {
    let userPs = parseInt(hardData[2]),
    userVerbrauch = hardData[3],
    userbj = hardData[1];
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
    if (benzinCount >= dieselCount) {
      console.log("benzin");
      that.CarView.fuelRec(false);
    } else if (dieselCount > benzinCount) {
      //console.log("diesel");
      recDiesel = true;
      that.CarView.fuelRec(true);
    }

    if (!recDiesel) {
      for (let i = 0; i<posCarArray.length; i++) {
        let adjustedVerbrauch = posCarArray[i].verbrauch[0],
        bps = posCarArray[i].benzin[0],
        empfFaktor,
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
        empfFaktor,
        list=[];
        if (adjustedVerbrauch > 0 && dps > 0) {
          empfFaktor = recDieselTrue(adjustedVerbrauch, posCarArray[i], userPs, userbj, userVerbrauch);
          list.push(posCarArray[i]);
          list.push(empfFaktor);
          empfArray.push(list);
        }
      }
    }
  }
  function sortResult(){
    empfArray.sort(function(a,b){
      return b[1]-a[1];
    });
  }

  function recBenzinTrue(adverbrauch, entry, userPs, userbj, userVerbrauch) {
    let benzinMax = entry.benzin[1],
    baujahrMax = entry.bau[1],
    empfFaktor = (benzinMax/userPs + userVerbrauch/adverbrauch + baujahrMax/userbj)/3;
    return(empfFaktor);
  }

  function recDieselTrue(adverbrauch, entry, userPs, userbj, userVerbrauch) {
    let dieselMax = entry.diesel[1],
    baujahrMax = entry.bau[1],
    empfFaktor = (dieselMax/userPs + userVerbrauch/adverbrauch + baujahrMax/userbj)/3;
    return(empfFaktor);
  }

  function preisErg() {
    empfArray.sort(function(a,b){
      return a[0].preis[2]-b[0].preis[2]; //0 = min preis oder 2 = calc preis
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

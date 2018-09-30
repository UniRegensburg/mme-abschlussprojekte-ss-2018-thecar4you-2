/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarView = function() {
  "use strict";

  var that = {};

  function initCarView() {
    setPictures();
    setUserActions();
  }

  function startWizard(){
    let startPage = document.getElementsByClassName("start-page"),
    wizard = document.getElementById("smartwizard");
    startPage[0].style.display = "none";
    wizard.style.display = "block";
  }

  //Beinhaltet alle Bilder der einzelnen Wizardschritte und gibt diese gemeinsam an CarApp.js
  function setPictures(){
    setStartPictures();
    setPricePictures();
    setAlterPictures();
    setKMPictures();
    setPsPictures();
    setSeatPictures();
    setVerbrauchPictures();
    setKraftstoffPictures();
  }

  //zeigt für jeden Wizardschritt die benötigten User Actions wie Slider, Buttons, Counter etc. an
  function setUserActions(){
    setPriceUserActions();
    setDistanceUserActions();
    setSeatUserActions();
    setVerbrauchUserActions();
  }

  //Die Funktion erzeugt dynamisch Spans
  function spanGenerator(parentTag, spanClass, classIndex, htmlText, spanTitle){
    let newSpan = document.createElement("span"),
    getParent = document.getElementsByClassName(parentTag)[classIndex].appendChild(newSpan);
    newSpan.className = spanClass;
    if (spanClass.includes("parent") || spanClass.includes("child")) {
      newSpan.draggable = "true";
    }
    getParent.innerHTML = htmlText;
	getParent.title = spanTitle;
  }

  //Die Funktion erzeugt dynamisch Images
  function imageGenerator(imgSource, imgId, imgClass, classIndex, imgTitle){
    let newImg = document.createElement("img"),
    getParent = document.getElementsByClassName(imgClass)[classIndex];
    newImg.src = imgSource;
    newImg.id = imgId;
    if (imgId.includes("money") || imgId.includes("work") || imgId.includes("shopping") || imgId.includes("school") || imgId.includes("hobby")) {
      newImg.draggable = "true";
        }
    getParent.appendChild(newImg);
	newImg.title = imgTitle;
  }

/*startscreen**************************************************************************************** */

  function setStartPictures(){
    imageGenerator("Pictures/StartImg1.png","startImg","picturesStart",0,"");
  }

/*preis**************************************************************************************** */

  function setPricePictures(){
    imageGenerator("Pictures/Money500.png","money500","lowMoney", 0, "");
    imageGenerator("Pictures/Money1000.png","money1000","lowMoney", 0, "");
    imageGenerator("Pictures/Money5000.png","money5000","lowMoney", 0, "");
    imageGenerator("Pictures/Money10000.png","money10000","highMoney", 0, "");
    imageGenerator("Pictures/Money50000.png","money50000","highMoney", 0, "");
    imageGenerator("Pictures/Money100000.png","money100000","highMoney", 0, "");
    imageGenerator("Pictures/Sparschwein2.png", "piggybank", "bank", 0, "");
  }

  function setPriceUserActions(){
    spanGenerator("user-action-price", "material-icons replay-button", 0, "replay", "Rückgängig");
    spanGenerator("user-action-price", "material-icons delete-button", 0, "delete", "Löschen");
    spanGenerator("user-action-price", "budget", 0, "0", "");
  }

  function updateViewMoney(conMoney) {
    let budget= document.getElementsByClassName("budget");
    budget[0].innerHTML = conMoney;
  }

/*alter************************************************************************************** */

  function setAlterPictures() {
    imageGenerator("Pictures/Plattenspieler.png", "platte", "picturesAlter", 0, "Schallplatte");
    imageGenerator("Pictures/Tape1.png", "tape", "picturesAlter", 0, "Kasette");
    imageGenerator("Pictures/CD-Rom.png", "cd", "picturesAlter", 0, "CD-Rom");
    imageGenerator("Pictures/mp3Player1.png", "mp3", "picturesAlter", 0, "MP3-Player");
    imageGenerator("Pictures/Smartspeaker.png", "smartspeaker", "picturesAlter", 0, "Smartspeaker");
  }

  function updateViewAlter(alter) {
    let alterOut = document.getElementById("alterOut");
    alterOut.innerHTML = alter;
    document.getElementById("alterSlider").value = alter;
  }

/*km**************************************************************************************** */

  function setKMPictures() {
    imageGenerator("Pictures/PlanetMars1.png", "mars", "picturesKM", 0, "Mars");
    imageGenerator("Pictures/PlanetErde3.png", "erde", "picturesKM", 0, "Erde");
    imageGenerator("Pictures/MoonPhobos.png", "phobos", "picturesKM", 0, "Phobos");
    imageGenerator("Pictures/PlanetNeptun.png", "neptun", "picturesKM", 0, "Neptun");
  }

  function updateViewKm(km) {
    let kmOut = document.getElementById("kmOut");
    kmOut.innerHTML = km;
    document.getElementById("kmSlider").value = km;
  }

/*strecke**************************************************************************************** */

  function setDistanceUserActions(){
    imageGenerator("Pictures/workG.png", "work-buttonT", "work-strecke", 0, "Arbeit (Täglich)");
    imageGenerator("Pictures/workY.png", "work-buttonO", "work-strecke", 0, "Arbeit (Oft)");
    imageGenerator("Pictures/workR.png", "work-buttonS", "work-strecke", 0, "Arbeit (Selten)");
    imageGenerator("Pictures/shoppingG.png", "shopping-buttonT", "shopping-strecke", 0, "Einkaufen (Täglich)");
    imageGenerator("Pictures/shoppingY.png", "shopping-buttonO", "shopping-strecke", 0, "Einkaufen (Oft)");
    imageGenerator("Pictures/shoppingR.png", "shopping-buttonS", "shopping-strecke", 0, "Einkaufen (Selten)");
    imageGenerator("Pictures/schoolG.png", "school-buttonT", "school-strecke", 0, "Bildung (Täglich)");
    imageGenerator("Pictures/schoolY.png", "school-buttonO", "school-strecke", 0, "Bildung (Oft)");
    imageGenerator("Pictures/schoolR.png", "school-buttonS", "school-strecke", 0, "Bildung (Selten)");
    imageGenerator("Pictures/hobbyG.png", "hobby-buttonT", "hobby-strecke", 0, "Freizeit (Täglich)");
    imageGenerator("Pictures/hobbyY.png", "hobby-buttonO", "hobby-strecke", 0, "Freizeit (Oft)");
    imageGenerator("Pictures/hobbyR.png", "hobby-buttonS", "hobby-strecke", 0, "Freizeit (Selten)");
  }

/*ps*************************************************************************************** */

  function setPsPictures() {
    imageGenerator("Pictures/AutoCorsa.jpg", "corsa", "picturesPs", 0, "");
    imageGenerator("Pictures/AutoBMW3er.jpg", "bmw", "picturesPs", 0, "");
    imageGenerator("Pictures/AutoTruck.jpg", "truck", "picturesPs", 0, "");
  }

  function updateViewPs(ps) {
    let psOut = document.getElementById("psOut");
    psOut.innerHTML = ps;
    document.getElementById("psSlider").value = ps;
  }

/*sitze********************************************************************************** */

  function setSeatPictures() {
	imageGenerator("Pictures/SitzplätzeZweier.png", "zweierSitz", "zwei-sitzer", 0, "");
	imageGenerator("Pictures/SitzplätzeFünfer.png", "fünferSitz", "fünf-sitzer", 0, "");
	imageGenerator("Pictures/SitzplätzeSiebener.png", "siebenerSitz", "sieben-sitzer", 0, "");
  }

  function setSeatUserActions() {
    for(let i = 0; i < 2; i++){
      spanGenerator("ZweiSitz-icons", "material-icons two-seats-span", 0, "crop_square", "");
      spanGenerator("FünfSitz-front-icons", "material-icons five-seats-span-front", 0, "crop_square", "");
      spanGenerator("SiebenSitz-front-icons", "material-icons seven-seats-span-front", 0, "crop_square", "");
      spanGenerator("SiebenSitz-middle-icons", "material-icons seven-seats-span-middle", 0, "crop_square", "");
    }

    for(let i = 0; i < 3; i++){
      spanGenerator("FünfSitz-back-icons", "material-icons five-seats-span-back", 0, "crop_square", "");
      spanGenerator("SiebenSitz-back-icons", "material-icons seven-seats-span-back", 0, "crop_square", "");
    }
	spanGenerator("person-icons", "material-icons delete_forever-button", 0 ,"seat_delete", "Löschen");
	spanGenerator("person-icons", "material-icons parent-icon", 0, "person", "Erwachsener");
	spanGenerator("person-icons", "material-icons child-icon", 0, "child_care", "Kind");
  }

  function updateSeatPic(seat, type) {
    if (type === "adult") {
      seat.innerHTML = "<img src='Pictures/baseline_person_black_36dp.png'>";
    } else if (type === "child") {
      seat.innerHTML = "<img src='Pictures/baseline_child_care_black_36dp.png'>";
    }
  }

  function deleteSeatPics(seatArray) {
    for (let i=0; i<seatArray.length; i++) {
      seatArray[i].innerHTML = "crop_square";
    }
  }

  function deleteSeatSpan(seat) {
    seat.innerHTML = "";
  }

/*verbrauch********************************************************************************** */

  function setVerbrauchPictures() {
    imageGenerator("Pictures/Tropfen2.png", "tropfen", "picturesVerbrauch", 0, "");
  }

  function setVerbrauchUserActions(){
    spanGenerator("user-action-verbrauch", "material-icons remove-button", 0, "remove", "");
    spanGenerator("user-action-verbrauch", "material-icons add-button", 0, "add", "");
    spanGenerator("user-action-verbrauch", "verbrauch", 0, "10L/100Km", "");
  }

  function adjustDrop(newVerbrauch) {
    let drop = document.getElementsByClassName("picturesVerbrauch"),
    verbrauchHTML = document.getElementsByClassName("verbrauch"),
    newHeight = parseInt(newVerbrauch) * 30;
    drop[0].style.height = newHeight + "px";
    verbrauchHTML[0].innerHTML = String(newVerbrauch) + "L/100Km";
  }

/*kraftstoff********************************************************************************** */

  function setKraftstoffPictures() {
	spanGenerator("benzin-action", "material-icons benzinPic", 0, "local_gas_station", "");
	spanGenerator("diesel-action", "material-icons dieselPic", 0, "local_gas_station", "");
  }

/*erg*************************************************************************************** */

  function setErgLink(str,empfArray,sortBy) {
    let link = document.getElementById("ergLink"),
    eList= document.getElementById("ergList"),
    listLength=10;
      if(empfArray.length<listLength){
        listLength=empfArray.length;
      }
      console.log(listLength);
      clearList();
      for (let i=0; i<listLength;i++){
        let liItem= document.createElement("li");
        console.log(i);
        switch (sortBy) {
          case "empf":
            //clearList();
            liItem.appendChild(document.createTextNode(empfArray[i][0].marke +" "+ empfArray[i][0].modell));
            eList.appendChild(liItem);
            continue;
          case "preis":
           //clearList();
            liItem.appendChild(document.createTextNode(empfArray[i][0].marke +" "+ empfArray[i][0].modell+" von "+empfArray[i][0].preis[0]+"€ bis "+empfArray[i][0].preis[empfArray[i][0].preis.length-1]+"€"));
            eList.appendChild(liItem);
            continue;
          case "ps":
           // clearList();
            liItem.appendChild(document.createTextNode(empfArray[i][0].marke +" "+ empfArray[i][0].modell+" mit bis zu"+empfArray[i][0].benzin[1]+"PS (Benziner)"));
            eList.appendChild(liItem);
            continue;
          case "verbrauch":
            //clearList();
            liItem.appendChild(document.createTextNode(empfArray[i][0].marke +" "+ empfArray[i][0].modell+" mit einem Verbrauch von "+empfArray[i][0].verbrauch[0]+" l/100km (Benzin) "+empfArray[i][0].verbrauch[1]+" l/100km (Diesel"));
            eList.appendChild(liItem);
            continue;
          case "alter":
            //clearList();
           liItem.appendChild(document.createTextNode(empfArray[i][0].marke +" "+ empfArray[i][0].modell+" gebaut von/bis "+empfArray[i][0].bau));
           eList.appendChild(liItem);
           continue;
          default:
            //clearList();
            liItem.appendChild(document.createTextNode(empfArray[i][0].marke +" "+ empfArray[i][0].modell));
            eList.appendChild(liItem);
        }
        
      }
      link.setAttribute("href", str);
    }
  function fuelRec(bool){
    console.log("HELLO NICE PERSON!");
    let line= document.getElementById("fuelRecomendation");
    if(bool){
      line.innerHTML= "Wir empfehlen auf Grund der gewünschten Leistung "+"Diesel.".bold();
    }
    else{
      line.innerHTML="Wir empfehlen auf Grund der gewünschten Leistung "+"Benzin.".bold();
    }
  }
  
  function clearList(){
    let list= document.getElementById("ergList");
    for (let i=list.childNodes.length-1;i>=0;i--){
      list.removeChild(list.childNodes[i]);
    }
  }
  
  function setResultBorder() {
	let resultList= document.getElementById("ergList");
	resultList.style.borderStyle = "double";
  }

	that.startWizard = startWizard;
  that.updateViewMoney = updateViewMoney;
  that.updateViewAlter = updateViewAlter;
  that.updateViewPs = updateViewPs;
  that.updateViewKm = updateViewKm;
  that.updateSeatPic = updateSeatPic;
  that.deleteSeatPics = deleteSeatPics;
  that.deleteSeatSpan = deleteSeatSpan;
  that.adjustDrop = adjustDrop;
  that.setErgLink = setErgLink;
  that.clearList = clearList;
  that.setResultBorder = setResultBorder;
  that.fuelRec=fuelRec;
	that.initCarView = initCarView;
  return that;
};

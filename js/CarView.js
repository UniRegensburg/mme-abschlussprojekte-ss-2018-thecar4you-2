/* eslint-env browser */

var CarApp = CarApp || {};
CarApp.CarView = function() {
  "use strict";

  var that = {};
  
  //Beinhaltet alle Bilder der einzelnen Wizardschritte und gibt diese gemeinsam an CarApp.js
  function setPictures(){
	  setPricePictures();
  }
  
  //zeigt für jeden Wizardschritt die benötigten User Actions wie Slider, Buttons, Counter etc. an
  function setUserActions(){
	  setPriceUserActions();
  }
  
  //Beinhaltet alle Bilder für den Wizardschritt Preis
  function setPricePictures(){
	  imageGenerator("Pictures/Sparschwein2.png", "piggybank", "pictures", 0);
  }
  
  //Beinhaltet alle User Actions für den Wizardschritt Preis
  function setPriceUserActions(){
	  spanGenerator("user-action", "material-icons replay-button", 0, "replay");
	  spanGenerator("user-action", "material-icons delete-button", 0, "delete");
	  spanGenerator("user-action", "budget", 0, "0");
  }
  
  //Die Funktion erzeugt dynamisch Spans
  function spanGenerator(parentTag, spanClass, classIndex, htmlText){
	  var newSpan = document.createElement("span");
	  var getParent = document.getElementsByClassName(parentTag)[classIndex].appendChild(newSpan);
	  newSpan.className = spanClass;
	  getParent.innerHTML = htmlText;
  }
  
  //Die Funktion erzeugt dynamisch Images
  function imageGenerator(imgSource, imgId, imgClass, classIndex){
	  var newImg = document.createElement("img");
	  var getParent = document.getElementsByClassName(imgClass)[classIndex];
	  newImg.src = imgSource;
	  newImg.id = imgId;
	  getParent.appendChild(newImg);
  }

	that.setPictures = setPictures;
	that.setUserActions = setUserActions;
	
  return that;
};

/* eslint-env browser */

var CarApp = CarApp || {};
CarApp = (function() {
  "use strict";

  var that = {},
  CarController,
  CarDatabase,
  CarModel,
  CarView;

  function init() {
    initCarController();
    initCarDatabase();
    initCarModel();
    initCarView();
  }
  
  function initCarController(){
	CarController = new CarApp.CarController();
  }
  
  function initCarDatabase(){
	CarDatabase = new CarApp.CarDatabase();
  }
  
  function initCarModel(){
	CarModel = new CarApp.CarModel();
  }
  
  function initCarView(){
	CarView = new CarApp.CarView();
	CarView.setPictures();
	CarView.setUserActions();
  }

  that.init = init;
  return that;
}());

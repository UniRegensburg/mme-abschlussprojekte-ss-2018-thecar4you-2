/* eslint-env browser */

var CarApp = CarApp || {};
CarApp = (function() {
  "use strict";

  var that = {},
  CarController,
  CarDatabase,
  CarModel,
  CarView,
  canvasEl;

  function init() {
    CarController = new CarApp.CarController();
    CarDatabase = new CarApp.CarDatabase();
    CarModel = new CarApp.CarModel();
    CarView = new CarApp.CarView();
    CarView.initCarView();
    CarModel.initCarModel();
    CarController.initCarController(CarView, CarModel);
    initCanvas();
  }

  function initCanvas() {
    canvasEl = document.querySelector(".canvas");
    CarApp.CanvasController(canvasEl);
  }

  that.init = init;
  return that;
}());

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
    CarController = new CarApp.CarController();
    CarDatabase = new CarApp.CarDatabase();
    CarModel = new CarApp.CarModel();
    CarView = new CarApp.CarView();
  }

  that.init = init;
  return that;
}());

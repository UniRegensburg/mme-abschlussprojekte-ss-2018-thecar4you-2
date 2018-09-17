/* eslint-env browser  */
// TODO: kein eraser?
var CarApp = CarApp || {};
CarApp.CanvasController = function(canvasNode, CarModel) {
  "use strict";

  var that = {},
    canvas,
    context,
    xPos = 0,
    yPos = 0,
    iconArray=[],
    canvasDelButton,
    workG, workY, workR,
    kaufG, kaufY, kaufR,
    bildG, bildY, bildR,
    freiG, freiY, freiR,
    chosenIcon="";

  function addIcons() {
    workG = document.getElementById("work-buttonT");
    workG.addEventListener("click", function() {
      chosenIcon = workG;
    });
    workY = document.getElementById("work-buttonO");
    workY.addEventListener("click", function() {
      chosenIcon = workY;
    });
    workR = document.getElementById("work-buttonS");
    workR.addEventListener("click", function() {
      chosenIcon = workR;
    });

    kaufG = document.getElementById("shopping-buttonT");
    kaufG.addEventListener("click", function() {
      chosenIcon = kaufG;
    });
    kaufY = document.getElementById("shopping-buttonO");
    kaufY.addEventListener("click", function() {
      chosenIcon = kaufY;
    });
    kaufR = document.getElementById("shopping-buttonS");
    kaufR.addEventListener("click", function() {
      chosenIcon = kaufR;
    });

    bildG = document.getElementById("school-buttonT");
    bildG.addEventListener("click", function() {
      chosenIcon = bildG;
    });
    bildY = document.getElementById("school-buttonO");
    bildY.addEventListener("click", function() {
      chosenIcon = bildY;
    });
    bildR = document.getElementById("school-buttonS");
    bildR.addEventListener("click", function() {
      chosenIcon = bildR;
    });

    freiG = document.getElementById("hobby-buttonT");
    freiG.addEventListener("click", function() {
      chosenIcon = freiG;
    });
    freiY = document.getElementById("hobby-buttonO");
    freiY.addEventListener("click", function() {
      chosenIcon = freiY;
    });
    freiR = document.getElementById("hobby-buttonS");
    freiR.addEventListener("click", function() {
      chosenIcon = freiR;
    });
  }

  function setCanvasDel() {
    canvasDelButton = document.getElementById("canvasDel");
    canvasDelButton.addEventListener("click", clear);
  }

  function clear() {
    context.clearRect(0,0,canvas.width,canvas.height);
    iconArray=[];
    chosenIcon="";
    CarModel.clearDist();
  }

  function onMouseClickCanvas(event) {
    xPos = event.offsetX;
    yPos = event.offsetY;
    draw(xPos, yPos);
    CarModel.calculateDist(iconArray);
  }

  function draw(x, y) {
    /*
    switch(chosenIcon) { //gibt declaration eslint fehler
      case workG:
        let id = "ctest2",
        img = document.getElementById(id);
        context.drawImage(img, x, y);
        iconArray.push([id, x, y]);
        console.log(iconArray);
        break;
      default:
        //
    }
    */
    if (chosenIcon === workG) {
      //let id = "ctest1",
      //img = document.getElementById(id);
      context.drawImage(workG, x, y);
      iconArray.push(["workG", x, y]);
      //console.log(iconArray);
    } else if (chosenIcon === workY) {
      //let id = "ctest2",
      //img = document.getElementById(id);
      context.drawImage(workY, x, y);
      iconArray.push(["workY", x, y]);
    } else if (chosenIcon === workR) {
      //      console.log(1);
    } else if (chosenIcon === kaufG) {
      //      console.log(2);

    } else if (chosenIcon === kaufY) {
      //      console.log(3);

    } else if (chosenIcon === kaufR) {
      //      console.log(4);

    } else if (chosenIcon === bildG) {
      //      console.log(5);

    } else if (chosenIcon === bildY) {
      //      console.log(6);

    } else if (chosenIcon === bildR) {
      //      console.log(7);

    } else if (chosenIcon === freiG) {
      //      console.log(8);
    } else if (chosenIcon === freiY) {
      //      console.log(9);
    } else if (chosenIcon === freiR) {
      //      console.log(0);
    }
  }

  function init() {
    canvas = canvasNode;
    context = canvas.getContext("2d");
    canvas.addEventListener("click", onMouseClickCanvas);
    addIcons();
    setCanvasDel();
    return that;
  }

  that.init = init;
  return init();
};

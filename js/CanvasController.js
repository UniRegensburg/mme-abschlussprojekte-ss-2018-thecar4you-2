/* eslint-env browser  */
// TODO: kein eraser?
var CarApp = CarApp || {};
CarApp.CanvasController = function(canvasNode) {
  "use strict";

  var that = {},
    canvas,
    context,
    options,
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
    workG = document.getElementsByClassName("material-icons work-buttonT")[0];
    workG.addEventListener("click", function() {
      chosenIcon = workG;
    });
    workY = document.getElementsByClassName("material-icons work-buttonO")[0];
    workY.addEventListener("click", function() {
      chosenIcon = workY;
    });
    workR = document.getElementsByClassName("material-icons work-buttonS")[0];
    workR.addEventListener("click", function() {
      chosenIcon = workR;
    });

    kaufG = document.getElementsByClassName("material-icons shopping-buttonT")[0];
    kaufG.addEventListener("click", function() {
      chosenIcon = kaufG;
    });
    kaufY = document.getElementsByClassName("material-icons shopping-buttonO")[0];
    kaufY.addEventListener("click", function() {
      chosenIcon = kaufY;
    });
    kaufR = document.getElementsByClassName("material-icons shopping-buttonS")[0];
    kaufR.addEventListener("click", function() {
      chosenIcon = kaufR;
    });

    bildG = document.getElementsByClassName("material-icons school-buttonT")[0];
    bildG.addEventListener("click", function() {
      chosenIcon = bildG;
    });
    bildY = document.getElementsByClassName("material-icons school-buttonO")[0];
    bildY.addEventListener("click", function() {
      chosenIcon = bildY;
    });
    bildR = document.getElementsByClassName("material-icons school-buttonS")[0];
    bildR.addEventListener("click", function() {
      chosenIcon = bildR;
    });

    freiG = document.getElementsByClassName("material-icons hobby-buttonT")[0];
    freiG.addEventListener("click", function() {
      chosenIcon = freiG;
    });
    freiY = document.getElementsByClassName("material-icons hobby-buttonO")[0];
    freiY.addEventListener("click", function() {
      chosenIcon = freiY;
    });
    freiR = document.getElementsByClassName("material-icons hobby-buttonS")[0];
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
  }

  function onMouseClickCanvas(event) {
    xPos = event.offsetX;
    yPos = event.offsetY;
    draw(xPos, yPos);
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
      let id = "ctest1",
      img = document.getElementById(id);
      context.drawImage(img, x, y);
      iconArray.push([id, x, y]);
      //console.log(iconArray);
    } else if (chosenIcon === workY) {
      let id = "ctest2",
      img = document.getElementById(id);
      context.drawImage(img, x, y);
      iconArray.push([id, x, y]);
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

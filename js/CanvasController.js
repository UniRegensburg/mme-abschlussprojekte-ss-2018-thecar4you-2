/* eslint-env browser  */
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
    chosenIcon="",
    backGroundImg,
    iconOffset = 18,
    backGroundOffsetX = 10,
    backGroundOffsetY = 25;

  function addIcons() { //sets listeners
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
    backGroundImg = new Image();
    backGroundImg.src="./Pictures/radar-sized.png";
    backGroundImg.onload = function() {
      context.drawImage(backGroundImg, backGroundOffsetX, backGroundOffsetY);
    };
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
    context.drawImage(backGroundImg, backGroundOffsetX, backGroundOffsetY);
  }

  function onMouseClickCanvas(event) {
    xPos = event.offsetX;
    yPos = event.offsetY;
    draw(xPos, yPos);
    CarModel.calculateDist(iconArray);
  }

  function draw(x, y) {
    if (chosenIcon === workG) {
      context.drawImage(workG, x-iconOffset, y-iconOffset);
      iconArray.push(["workG", x, y]);
    } else if (chosenIcon === workY) {
      context.drawImage(workY, x-iconOffset, y-iconOffset);
      iconArray.push(["workY", x, y]);
    } else if (chosenIcon === workR) {
      context.drawImage(workR, x-iconOffset, y-iconOffset);
      iconArray.push(["workR", x, y]);
    } else if (chosenIcon === kaufG) {
      context.drawImage(kaufG, x-iconOffset, y-iconOffset);
      iconArray.push(["kaufG", x, y]);
    } else if (chosenIcon === kaufY) {
      context.drawImage(kaufY, x-iconOffset, y-iconOffset);
      iconArray.push(["kaufY", x, y]);
    } else if (chosenIcon === kaufR) {
      context.drawImage(kaufR, x-iconOffset, y-iconOffset);
      iconArray.push(["kaufR", x, y]);
    } else if (chosenIcon === bildG) {
      context.drawImage(bildG, x-iconOffset, y-iconOffset);
      iconArray.push(["bildG", x, y]);
    } else if (chosenIcon === bildY) {
      context.drawImage(bildY, x-iconOffset, y-iconOffset);
      iconArray.push(["bildY", x, y]);
    } else if (chosenIcon === bildR) {
      context.drawImage(bildR, x-iconOffset, y-iconOffset);
      iconArray.push(["bildR", x, y]);
    } else if (chosenIcon === freiG) {
      context.drawImage(freiG, x-iconOffset, y-iconOffset);
      iconArray.push(["freiG", x, y]);
    } else if (chosenIcon === freiY) {
      context.drawImage(freiY, x-iconOffset, y-iconOffset);
      iconArray.push(["freiY", x, y]);
    } else if (chosenIcon === freiR) {
      context.drawImage(freiR, x-iconOffset, y-iconOffset);
      iconArray.push(["freiR", x, y]);
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

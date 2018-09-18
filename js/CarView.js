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
  }

  //zeigt für jeden Wizardschritt die benötigten User Actions wie Slider, Buttons, Counter etc. an
  function setUserActions(){
    setPriceUserActions();
    setDistanceUserActions();
    setSeatUserActions();
    setVerbrauchUserActions();
  }

  //Die Funktion erzeugt dynamisch Spans
  function spanGenerator(parentTag, spanClass, classIndex, htmlText){
    let newSpan = document.createElement("span"),
    getParent = document.getElementsByClassName(parentTag)[classIndex].appendChild(newSpan);
    newSpan.className = spanClass;
    if (spanClass.includes("parent") || spanClass.includes("child")) {
      newSpan.draggable = "true";
    }
    getParent.innerHTML = htmlText;
  }

  //Die Funktion erzeugt dynamisch Images
  function imageGenerator(imgSource, imgId, imgClass, classIndex){
    let newImg = document.createElement("img"),
    getParent = document.getElementsByClassName(imgClass)[classIndex];
    newImg.src = imgSource;
    newImg.id = imgId;
    if (imgId.includes("money")) {
      newImg.draggable = "true";
        }
    getParent.appendChild(newImg);
  }

/*startscreen**************************************************************************************** */

  function setStartPictures(){
    imageGenerator("Pictures/StartImg1.png","startImg","picturesStart",0);
  }

/*preis**************************************************************************************** */

  function setPricePictures(){
    imageGenerator("Pictures/Money500.png","money500","lowMoney", 0);
    imageGenerator("Pictures/Money1000.png","money1000","lowMoney", 0);
    imageGenerator("Pictures/Money5000.png","money5000","lowMoney", 0);
    imageGenerator("Pictures/Money10000.png","money10000","highMoney", 0);
    imageGenerator("Pictures/Money50000.png","money50000","highMoney", 0);
    imageGenerator("Pictures/Money100000.png","money100000","highMoney", 0);
    imageGenerator("Pictures/Sparschwein2.png", "piggybank", "bank", 0);
  }

  function setPriceUserActions(){
    spanGenerator("user-action-price", "material-icons replay-button", 0, "replay");
    spanGenerator("user-action-price", "material-icons delete-button", 0, "delete");
    spanGenerator("user-action-price", "budget", 0, "0");
  }

/*alter************************************************************************************** */

  function setAlterPictures() {
    imageGenerator("Pictures/Plattenspieler.png", "platte", "picturesAlter", 0);
    imageGenerator("Pictures/Tape1.png", "tape", "picturesAlter", 0);
    imageGenerator("Pictures/CD-Rom.png", "cd", "picturesAlter", 0);
    imageGenerator("Pictures/mp3Player1.png", "mp3", "picturesAlter", 0);
    imageGenerator("Pictures/Smartspeaker.png", "smartspeaker", "picturesAlter", 0);
  }

/*km**************************************************************************************** */

  function setKMPictures() {
    imageGenerator("Pictures/PlanetMars1.png", "mars", "picturesKM", 0);
    imageGenerator("Pictures/PlanetErde3.png", "erde", "picturesKM", 0);
    imageGenerator("Pictures/MoonPhobos.png", "phobos", "picturesKM", 0);
    imageGenerator("Pictures/PlanetNeptun.png", "neptun", "picturesKM", 0);
  }

/*strecke**************************************************************************************** */

  function setDistanceUserActions(){
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABXklEQVR4Ae3bsU7CUBjF8Tp14QUciku3dvGcRxNWV8LsJM9g4BFkczKhr+FESBRV2utsYnILH+R+Sc//rCy/hIEvuWTqHCmllKoLTLHmliGyLdaY1kXmqWrEFTqG/kPHVTXKfFTmaBiOH5oydwHAguG0YZGlDyXakwEtyuQAzhgMmyUHYGMBoEkO4N4C4Ht6QPg7w+cdAQQQQAABBKgL3sV/39t3kfuhGuEJHUOS2e+HMucrQ7LZ7wc8MKSe4X7gNQ9OAf3uB94zOF78fsCLZwCaOODNMaDP/cAP14AgwMUnwF4A0wTApwACDBzwJYAAwwbwWwABBg74EcA2AQ4CCDBsAFoBBBg4oBPANAEYBBBAAAEEGDDgSgDbBMi4cw3YmZ/T+39uM3cNmEcBtzd+bzK0HGfx8Oj60V+8MsfG+7PL+MPXpbeHr1ge+cc5jjnx8fSYz5z8991XSimllFK/yNrWIl2IX2wAAAAASUVORK5CYII=", "work-buttonT", "work-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABXklEQVR4Ae3bsU7CUBjF8Tp14QUciku3dvGcRxNWV8LsJM9g4BFkczKhr+FESBRV2utsYnILH+R+Sc//rCy/hIEvuWTqHCmllKoLTLHmliGyLdaY1kXmqWrEFTqG/kPHVTXKfFTmaBiOH5oydwHAguG0YZGlDyXakwEtyuQAzhgMmyUHYGMBoEkO4N4C4Ht6QPg7w+cdAQQQQAABBKgL3sV/39t3kfuhGuEJHUOS2e+HMucrQ7LZ7wc8MKSe4X7gNQ9OAf3uB94zOF78fsCLZwCaOODNMaDP/cAP14AgwMUnwF4A0wTApwACDBzwJYAAwwbwWwABBg74EcA2AQ4CCDBsAFoBBBg4oBPANAEYBBBAAAEEGDDgSgDbBMi4cw3YmZ/T+39uM3cNmEcBtzd+bzK0HGfx8Oj60V+8MsfG+7PL+MPXpbeHr1ge+cc5jjnx8fSYz5z8991XSimllFK/yNrWIl2IX2wAAAAASUVORK5CYII=", "work-buttonO", "work-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABXklEQVR4Ae3bsU7CUBjF8Tp14QUciku3dvGcRxNWV8LsJM9g4BFkczKhr+FESBRV2utsYnILH+R+Sc//rCy/hIEvuWTqHCmllKoLTLHmliGyLdaY1kXmqWrEFTqG/kPHVTXKfFTmaBiOH5oydwHAguG0YZGlDyXakwEtyuQAzhgMmyUHYGMBoEkO4N4C4Ht6QPg7w+cdAQQQQAABBKgL3sV/39t3kfuhGuEJHUOS2e+HMucrQ7LZ7wc8MKSe4X7gNQ9OAf3uB94zOF78fsCLZwCaOODNMaDP/cAP14AgwMUnwF4A0wTApwACDBzwJYAAwwbwWwABBg74EcA2AQ4CCDBsAFoBBBg4oBPANAEYBBBAAAEEGDDgSgDbBMi4cw3YmZ/T+39uM3cNmEcBtzd+bzK0HGfx8Oj60V+8MsfG+7PL+MPXpbeHr1ge+cc5jjnx8fSYz5z8991XSimllFK/yNrWIl2IX2wAAAAASUVORK5CYII=", "work-buttonS", "work-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACtUlEQVR4Ae3ZA6weQRAH8Klt2/x4M1GNqG6D2g1q27ZtBrVt20ZQm89+dfTxYWfvNtnfxZjd/xx3DzRN0zTtD/rp92iseAC8oXgA+mnUVjwAHlE8AP102hUPQNsVD4AJ7gpKB6CfuA7UQufppyWOL7jfVhiSz2hIPy1zvDMKQPLRfetEwE2QfNjKOgHoM6RAWnxmmQA/ICWMblYJgHshRdLjW2sEcFeHlKH+luj/Dkip4lnwu+kB4t2lIeWMMaYHWASpYcuOYaZOP8SWF1KHZpgaYASkllEAY0y7fd+Uzgyph0tN639nEMEoRXGmTP8+pAUxcJMpAeqBKO4KmMg6Vf6tBNotefoJgjcSkKQG4FjC4nGJAaJcxUA0rC+x/1OAA96QFOCrMxtwMJpJCtALmKSRssh8CumAC7aXEKAFMEqLL5hv30vAy+jB3H8EXraM+Ilx+tuAHw1hm36suzTws2XnWujjApADr/GvfhlRY6b+DwMp0tJTnscnZQAZsAtL/2878oAMpTPjG+G9T6TV5TOBHDhU7Fc/PsMtRlWQpXxOCvGzb6kGnOXVw4WgDlcxiuJ/cjPC9fxPbkaOspjgMf23lAHUQXO8+t8eVEK3PQI8BrVgtGeA4llAJRQqd2cORMM7qgeYqXgAoxQmKB0AAFcqHqB8Jpn3AddyfhcmygzAgErSEDxDPxQNoGmavQQN/nsT/8AzONRegrUew2N0ByZ6bInstmXnqcfwIqObPvd17pbPxF9PAFzsd2tqFXc9AagIxfsdMAHL89YTgMYFfHNO560nAF4ONCDe5a0nQJA/YxG89QSgDwEHDOWtJwBeCnzKeesJgOMDDjiTt54ARlGK8//Yo5Is9fSLzHNNfMPfq5+pHsPH3FbPjy/cZcvOWY/hc/r/mvgHnaYhVNLMepqmaZr2CwvSVseKd9FUAAAAAElFTkSuQmCC", "shopping-buttonT", "shopping-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACtUlEQVR4Ae3ZA6weQRAH8Klt2/x4M1GNqG6D2g1q27ZtBrVt20ZQm89+dfTxYWfvNtnfxZjd/xx3DzRN0zTtD/rp92iseAC8oXgA+mnUVjwAHlE8AP102hUPQNsVD4AJ7gpKB6CfuA7UQufppyWOL7jfVhiSz2hIPy1zvDMKQPLRfetEwE2QfNjKOgHoM6RAWnxmmQA/ICWMblYJgHshRdLjW2sEcFeHlKH+luj/Dkip4lnwu+kB4t2lIeWMMaYHWASpYcuOYaZOP8SWF1KHZpgaYASkllEAY0y7fd+Uzgyph0tN639nEMEoRXGmTP8+pAUxcJMpAeqBKO4KmMg6Vf6tBNotefoJgjcSkKQG4FjC4nGJAaJcxUA0rC+x/1OAA96QFOCrMxtwMJpJCtALmKSRssh8CumAC7aXEKAFMEqLL5hv30vAy+jB3H8EXraM+Ilx+tuAHw1hm36suzTws2XnWujjApADr/GvfhlRY6b+DwMp0tJTnscnZQAZsAtL/2878oAMpTPjG+G9T6TV5TOBHDhU7Fc/PsMtRlWQpXxOCvGzb6kGnOXVw4WgDlcxiuJ/cjPC9fxPbkaOspjgMf23lAHUQXO8+t8eVEK3PQI8BrVgtGeA4llAJRQqd2cORMM7qgeYqXgAoxQmKB0AAFcqHqB8Jpn3AddyfhcmygzAgErSEDxDPxQNoGmavQQN/nsT/8AzONRegrUew2N0ByZ6bInstmXnqcfwIqObPvd17pbPxF9PAFzsd2tqFXc9AagIxfsdMAHL89YTgMYFfHNO560nAF4ONCDe5a0nQJA/YxG89QSgDwEHDOWtJwBeCnzKeesJgOMDDjiTt54ARlGK8//Yo5Is9fSLzHNNfMPfq5+pHsPH3FbPjy/cZcvOWY/hc/r/mvgHnaYhVNLMepqmaZr2CwvSVseKd9FUAAAAAElFTkSuQmCC", "shopping-buttonO", "shopping-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACtUlEQVR4Ae3ZA6weQRAH8Klt2/x4M1GNqG6D2g1q27ZtBrVt20ZQm89+dfTxYWfvNtnfxZjd/xx3DzRN0zTtD/rp92iseAC8oXgA+mnUVjwAHlE8AP102hUPQNsVD4AJ7gpKB6CfuA7UQufppyWOL7jfVhiSz2hIPy1zvDMKQPLRfetEwE2QfNjKOgHoM6RAWnxmmQA/ICWMblYJgHshRdLjW2sEcFeHlKH+luj/Dkip4lnwu+kB4t2lIeWMMaYHWASpYcuOYaZOP8SWF1KHZpgaYASkllEAY0y7fd+Uzgyph0tN639nEMEoRXGmTP8+pAUxcJMpAeqBKO4KmMg6Vf6tBNotefoJgjcSkKQG4FjC4nGJAaJcxUA0rC+x/1OAA96QFOCrMxtwMJpJCtALmKSRssh8CumAC7aXEKAFMEqLL5hv30vAy+jB3H8EXraM+Ilx+tuAHw1hm36suzTws2XnWujjApADr/GvfhlRY6b+DwMp0tJTnscnZQAZsAtL/2878oAMpTPjG+G9T6TV5TOBHDhU7Fc/PsMtRlWQpXxOCvGzb6kGnOXVw4WgDlcxiuJ/cjPC9fxPbkaOspjgMf23lAHUQXO8+t8eVEK3PQI8BrVgtGeA4llAJRQqd2cORMM7qgeYqXgAoxQmKB0AAFcqHqB8Jpn3AddyfhcmygzAgErSEDxDPxQNoGmavQQN/nsT/8AzONRegrUew2N0ByZ6bInstmXnqcfwIqObPvd17pbPxF9PAFzsd2tqFXc9AagIxfsdMAHL89YTgMYFfHNO560nAF4ONCDe5a0nQJA/YxG89QSgDwEHDOWtJwBeCnzKeesJgOMDDjiTt54ARlGK8//Yo5Is9fSLzHNNfMPfq5+pHsPH3FbPjy/cZcvOWY/hc/r/mvgHnaYhVNLMepqmaZr2CwvSVseKd9FUAAAAAElFTkSuQmCC", "shopping-buttonS", "shopping-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAADOUlEQVR4Ae2bA6wdURRFb23btmb2qW23YW2GNaPabtigZlzbbVQ7qm1b36d+03/z57y5k9y146e7H9bMOzOjZLBYLBaLxWKxVK+K/dhfvaoKI1Qca/CdYigG37G2ajEVJpycmIdPFPMz+EgLymZXYaBsBhqDFxTzd/CcxlZJr4wmFXrTbYrxyC23j0qlzMRtQhc9F8+56DYxb/E1aA/FaGQvu8kk32iE3WSebzTCbjLPNxphN5nnG42wm0z0DUfeTXK+EXWTvG8E3STvG0E3yftG0E3yvpF3k7xv5N0k7xt5N8n7Rt5N8r6Rd5O8b+TdJO8beTfJ+0beTW5LLhCOhPYrxPH4EdOrkBZgquXCfNaouQnVhow+YIZeAR7NHjbA/d+w0i2slGYBxmkVrJuwG5VUPPoFgncT216ngDluus3bW/0CgbsJLzCe93j0CwTsJnzC4mq5FON3AVk34Ts2OSUVI1VAzE3HHUcxogUE3IQrbmfFyBYQcNMDDFVplJIvIOAmvMXkopkUI1ugbHaf3fQVy9x83q/mawF6SiMonV9uwpYa5VUEKB0Np6f+F4h/2DW3u0qVUjfhJNXxkEM33OAF+l8gPmedBilw0zV09dBzAzrL95QpwNmBSvpu+t+XkHbwPcUL8F66hps+0JwK2SIuvihW4BvFRLEALyo5bsI3Wh25LOWg2fSBnzN6BTjPMMrbTV6n21RJj5E8BwygAAc3qCe7SYNUbo9E3wRcgN2kN8d3m7BvDCjAwe7kzfFRHbv4MUYV8Pq5MlWL0Sre7TCtAOcD5v3bTU5OzGXfmFuA5/hj+F8tb97c0ewbwwtwcBO9k9yUCr14ByNEBXiyw8cdgi8Q3bnQK+U3FfNgCX2OyuI/09KKeZQE1UpjI0tQdLQiiePQcbECPFqRxmmPK/6Pcp32KoqkRn/c823xdzBApVbRpmRGd4IPbnpJE0tmVEFRJTcW0Wc/R7kB4JSk9fiu7xvaIOwbPTdpzoUOs28MAm2SORc6j7bKUFK7feHtptvUz9jT79lNGEevIh06kvaNbzNrWvDXJSgL2TchwS2BteCLgNYZfxGQx1zosNTpxBaLxWKxWCyWWJ8ARvuB3pLcAAAAAElFTkSuQmCC", "school-buttonT", "school-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAADOUlEQVR4Ae2bA6wdURRFb23btmb2qW23YW2GNaPabtigZlzbbVQ7qm1b36d+03/z57y5k9y146e7H9bMOzOjZLBYLBaLxWKxVK+K/dhfvaoKI1Qca/CdYigG37G2ajEVJpycmIdPFPMz+EgLymZXYaBsBhqDFxTzd/CcxlZJr4wmFXrTbYrxyC23j0qlzMRtQhc9F8+56DYxb/E1aA/FaGQvu8kk32iE3WSebzTCbjLPNxphN5nnG42wm0z0DUfeTXK+EXWTvG8E3STvG0E3yftG0E3yvpF3k7xv5N0k7xt5N8n7Rt5N8r6Rd5O8b+TdJO8beTfJ+0beTW5LLhCOhPYrxPH4EdOrkBZgquXCfNaouQnVhow+YIZeAR7NHjbA/d+w0i2slGYBxmkVrJuwG5VUPPoFgncT216ngDluus3bW/0CgbsJLzCe93j0CwTsJnzC4mq5FON3AVk34Ts2OSUVI1VAzE3HHUcxogUE3IQrbmfFyBYQcNMDDFVplJIvIOAmvMXkopkUI1ugbHaf3fQVy9x83q/mawF6SiMonV9uwpYa5VUEKB0Np6f+F4h/2DW3u0qVUjfhJNXxkEM33OAF+l8gPmedBilw0zV09dBzAzrL95QpwNmBSvpu+t+XkHbwPcUL8F66hps+0JwK2SIuvihW4BvFRLEALyo5bsI3Wh25LOWg2fSBnzN6BTjPMMrbTV6n21RJj5E8BwygAAc3qCe7SYNUbo9E3wRcgN2kN8d3m7BvDCjAwe7kzfFRHbv4MUYV8Pq5MlWL0Sre7TCtAOcD5v3bTU5OzGXfmFuA5/hj+F8tb97c0ewbwwtwcBO9k9yUCr14ByNEBXiyw8cdgi8Q3bnQK+U3FfNgCX2OyuI/09KKeZQE1UpjI0tQdLQiiePQcbECPFqRxmmPK/6Pcp32KoqkRn/c823xdzBApVbRpmRGd4IPbnpJE0tmVEFRJTcW0Wc/R7kB4JSk9fiu7xvaIOwbPTdpzoUOs28MAm2SORc6j7bKUFK7feHtptvUz9jT79lNGEevIh06kvaNbzNrWvDXJSgL2TchwS2BteCLgNYZfxGQx1zosNTpxBaLxWKxWCyWWJ8ARvuB3pLcAAAAAElFTkSuQmCC", "school-buttonO", "school-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAADOUlEQVR4Ae2bA6wdURRFb23btmb2qW23YW2GNaPabtigZlzbbVQ7qm1b36d+03/z57y5k9y146e7H9bMOzOjZLBYLBaLxWKxVK+K/dhfvaoKI1Qca/CdYigG37G2ajEVJpycmIdPFPMz+EgLymZXYaBsBhqDFxTzd/CcxlZJr4wmFXrTbYrxyC23j0qlzMRtQhc9F8+56DYxb/E1aA/FaGQvu8kk32iE3WSebzTCbjLPNxphN5nnG42wm0z0DUfeTXK+EXWTvG8E3STvG0E3yftG0E3yvpF3k7xv5N0k7xt5N8n7Rt5N8r6Rd5O8b+TdJO8beTfJ+0beTW5LLhCOhPYrxPH4EdOrkBZgquXCfNaouQnVhow+YIZeAR7NHjbA/d+w0i2slGYBxmkVrJuwG5VUPPoFgncT216ngDluus3bW/0CgbsJLzCe93j0CwTsJnzC4mq5FON3AVk34Ts2OSUVI1VAzE3HHUcxogUE3IQrbmfFyBYQcNMDDFVplJIvIOAmvMXkopkUI1ugbHaf3fQVy9x83q/mawF6SiMonV9uwpYa5VUEKB0Np6f+F4h/2DW3u0qVUjfhJNXxkEM33OAF+l8gPmedBilw0zV09dBzAzrL95QpwNmBSvpu+t+XkHbwPcUL8F66hps+0JwK2SIuvihW4BvFRLEALyo5bsI3Wh25LOWg2fSBnzN6BTjPMMrbTV6n21RJj5E8BwygAAc3qCe7SYNUbo9E3wRcgN2kN8d3m7BvDCjAwe7kzfFRHbv4MUYV8Pq5MlWL0Sre7TCtAOcD5v3bTU5OzGXfmFuA5/hj+F8tb97c0ewbwwtwcBO9k9yUCr14ByNEBXiyw8cdgi8Q3bnQK+U3FfNgCX2OyuI/09KKeZQE1UpjI0tQdLQiiePQcbECPFqRxmmPK/6Pcp32KoqkRn/c823xdzBApVbRpmRGd4IPbnpJE0tmVEFRJTcW0Wc/R7kB4JSk9fiu7xvaIOwbPTdpzoUOs28MAm2SORc6j7bKUFK7feHtptvUz9jT79lNGEevIh06kvaNbzNrWvDXJSgL2TchwS2BteCLgNYZfxGQx1zosNTpxBaLxWKxWCyWWJ8ARvuB3pLcAAAAAElFTkSuQmCC", "school-buttonS", "school-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACTUlEQVR4Ae2ZgUZEQRSGb9qyQD3CAhDcPT8uhMSyIBDQswRIT5KAWqmoLKDeozdYstXW2puWX3vr7mHBPb/mH7BjZu73GWbOmixmUlJSUlIEsoYzO/rbjV3cdNrx8dftHKXNFhSIP0ZpwzAK2FqCf4Hyu9mse/gbH2UYBRQYEfAPPtuUI4gfRgGFvcwBDyrdLeJXFVD84FNhZ7NJfPvGn7fPBYUWrgm4qIBjjq60QYP4GBGDCjX4brP3fC8APhWsjw0R/KyF5xqgiT1Gxnd2gE0GnwrC+DyFhPF5DwjjU0EVn0XDgyg+iwZR/AC3rjJ+wl+t5sFrPPx7lKoCxNe9vHApXj5Y3yZJIbICYfEmqkDQfM/eRRUIGV4Bpx5+dAXugA/nKEjg+woS+L6CBL6vIIEfTAEDD0RAodO2oQ8hpkAAUQV+XFSBHxZVwB0/KqnANKrA1W47bVEFrmRDUQWuIqrAFXQUnNl8d1ZQcGZiIHAiObMm1pc4VH38YAoC+L6CBL6vIIHvK/gjUNqJRI2U92rxuQPRFfIePvhbUoH4kgps/0FhX1wBlxkjqXCPDc6XUyC+rsC1OH7WEsa3C3X89YTfGP6DKj4FXlDo4lPB1MuHEUwZnwrC+FRQwbcnfNb0Pzd2meW9VYuG7gEVAuyA81/XqXmo0CA+Y1e1R+Mxpl7NM1eYNofvvDvzcuoeYuoVDRzBeyCOwhgFAW22FJ8KI46OojDG7k+/HVHBzolfTb4dAJ8KxGeoMMdfyyKH787EryrgTAA/JSUlJSVovgBiNbFq4dLK7AAAAABJRU5ErkJggg==", "hobby-buttonT", "hobby-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACTUlEQVR4Ae2ZgUZEQRSGb9qyQD3CAhDcPT8uhMSyIBDQswRIT5KAWqmoLKDeozdYstXW2puWX3vr7mHBPb/mH7BjZu73GWbOmixmUlJSUlIEsoYzO/rbjV3cdNrx8dftHKXNFhSIP0ZpwzAK2FqCf4Hyu9mse/gbH2UYBRQYEfAPPtuUI4gfRgGFvcwBDyrdLeJXFVD84FNhZ7NJfPvGn7fPBYUWrgm4qIBjjq60QYP4GBGDCjX4brP3fC8APhWsjw0R/KyF5xqgiT1Gxnd2gE0GnwrC+DyFhPF5DwjjU0EVn0XDgyg+iwZR/AC3rjJ+wl+t5sFrPPx7lKoCxNe9vHApXj5Y3yZJIbICYfEmqkDQfM/eRRUIGV4Bpx5+dAXugA/nKEjg+woS+L6CBL6vIIEfTAEDD0RAodO2oQ8hpkAAUQV+XFSBHxZVwB0/KqnANKrA1W47bVEFrmRDUQWuIqrAFXQUnNl8d1ZQcGZiIHAiObMm1pc4VH38YAoC+L6CBL6vIIHvK/gjUNqJRI2U92rxuQPRFfIePvhbUoH4kgps/0FhX1wBlxkjqXCPDc6XUyC+rsC1OH7WEsa3C3X89YTfGP6DKj4FXlDo4lPB1MuHEUwZnwrC+FRQwbcnfNb0Pzd2meW9VYuG7gEVAuyA81/XqXmo0CA+Y1e1R+Mxpl7NM1eYNofvvDvzcuoeYuoVDRzBeyCOwhgFAW22FJ8KI46OojDG7k+/HVHBzolfTb4dAJ8KxGeoMMdfyyKH787EryrgTAA/JSUlJSVovgBiNbFq4dLK7AAAAABJRU5ErkJggg==", "hobby-buttonO", "hobby-strecke", 0);
    imageGenerator("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACTUlEQVR4Ae2ZgUZEQRSGb9qyQD3CAhDcPT8uhMSyIBDQswRIT5KAWqmoLKDeozdYstXW2puWX3vr7mHBPb/mH7BjZu73GWbOmixmUlJSUlIEsoYzO/rbjV3cdNrx8dftHKXNFhSIP0ZpwzAK2FqCf4Hyu9mse/gbH2UYBRQYEfAPPtuUI4gfRgGFvcwBDyrdLeJXFVD84FNhZ7NJfPvGn7fPBYUWrgm4qIBjjq60QYP4GBGDCjX4brP3fC8APhWsjw0R/KyF5xqgiT1Gxnd2gE0GnwrC+DyFhPF5DwjjU0EVn0XDgyg+iwZR/AC3rjJ+wl+t5sFrPPx7lKoCxNe9vHApXj5Y3yZJIbICYfEmqkDQfM/eRRUIGV4Bpx5+dAXugA/nKEjg+woS+L6CBL6vIIEfTAEDD0RAodO2oQ8hpkAAUQV+XFSBHxZVwB0/KqnANKrA1W47bVEFrmRDUQWuIqrAFXQUnNl8d1ZQcGZiIHAiObMm1pc4VH38YAoC+L6CBL6vIIHvK/gjUNqJRI2U92rxuQPRFfIePvhbUoH4kgps/0FhX1wBlxkjqXCPDc6XUyC+rsC1OH7WEsa3C3X89YTfGP6DKj4FXlDo4lPB1MuHEUwZnwrC+FRQwbcnfNb0Pzd2meW9VYuG7gEVAuyA81/XqXmo0CA+Y1e1R+Mxpl7NM1eYNofvvDvzcuoeYuoVDRzBeyCOwhgFAW22FJ8KI46OojDG7k+/HVHBzolfTb4dAJ8KxGeoMMdfyyKH787EryrgTAA/JSUlJSVovgBiNbFq4dLK7AAAAABJRU5ErkJggg==", "hobby-buttonS", "hobby-strecke", 0);
  }

/*ps*************************************************************************************** */

  function setPsPictures() {
    imageGenerator("Pictures/AutoCorsa.jpg", "corsa", "picturesPs", 0);
    imageGenerator("Pictures/AutoBMW3er.jpg", "bmw", "picturesPs", 0);
    imageGenerator("Pictures/AutoTruck.jpg", "truck", "picturesPs", 0);
  }

/*sitze********************************************************************************** */

  function setSeatPictures() {
	imageGenerator("Pictures/SitzplätzeZweier.png", "zweierSitz", "zwei-sitzer", 0);
	imageGenerator("Pictures/SitzplätzeFünfer.png", "fünferSitz", "fünf-sitzer", 0);
	imageGenerator("Pictures/SitzplätzeSiebener.png", "siebenerSitz", "sieben-sitzer", 0);
  }

  function setSeatUserActions() {
    for(let i = 0; i < 2; i++){
      spanGenerator("ZweiSitz-icons", "material-icons two-seats-span", 0, "crop_square");
      spanGenerator("FünfSitz-front-icons", "material-icons five-seats-span-front", 0, "crop_square");
      spanGenerator("SiebenSitz-front-icons", "material-icons seven-seats-span-front", 0, "crop_square");
      spanGenerator("SiebenSitz-middle-icons", "material-icons seven-seats-span-middle", 0, "crop_square");
    }

    for(let i = 0; i < 3; i++){
      spanGenerator("FünfSitz-back-icons", "material-icons five-seats-span-back", 0, "crop_square");
      spanGenerator("SiebenSitz-back-icons", "material-icons seven-seats-span-back", 0, "crop_square");
    }
  spanGenerator("person-icons", "material-icons delete_forever-button", 0 ,"seat_delete");
	spanGenerator("person-icons", "material-icons parent-icon", 0, "person");
	spanGenerator("person-icons", "material-icons child-icon", 0, "child_care");
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
    imageGenerator("Pictures/Tropfen2.png", "tropfen", "picturesVerbrauch", 0);
  }

  function setVerbrauchUserActions(){
    spanGenerator("user-action-verbrauch", "material-icons remove-button", 0, "remove");
    spanGenerator("user-action-verbrauch", "material-icons add-button", 0, "add");
    spanGenerator("user-action-verbrauch", "verbrauch", 0, "10L/100Km");
  }

  function adjustDrop() {
    let drop = document.getElementsByClassName("picturesVerbrauch"),
    liter = document.getElementsByClassName("verbrauch")[0].innerHTML,
    newHeight;
    liter = liter.replace("L/100Km");
    newHeight = parseInt(liter) * 30;
    drop[0].style.height = newHeight + "px";
  }

	that.startWizard = startWizard;
  that.updateSeatPic = updateSeatPic;
  that.deleteSeatPics = deleteSeatPics;
  that.deleteSeatSpan = deleteSeatSpan;
  that.adjustDrop = adjustDrop;
	that.initCarView = initCarView;
  return that;
};

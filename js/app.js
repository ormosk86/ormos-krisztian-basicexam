function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);

  // 1. feladat
  function sortSpaceships(spaceshipsArray) {
    spaceshipsArray = spaceshipsArray.sort(function (lho, rho) {
      var result;

      if (lho.cost_in_credits > rho.cost_in_credits) {
        result = 1;
      } else if (lho.cost_in_credits == rho.cost_in_credits) {
        result = 0;
      } else if (lho.cost_in_credits < rho.cost_in_credits) {
        result = -1;
      }
      return result;
    });
  };


  // 2. feladat

  function consumablesNotNull(spaceshipsArray) {
    for (var i = spaceshipsArray.length - 1; i >= 0; --i) {
      if (spaceshipsArray[i].consumables == null) {
        spaceshipsArray.splice(i, 1);
      }
    }
    return spaceshipsArray;
  }



  // 3. feladat
  function nullToUnknown(spaceshipsArray) {
    for (var i = 0; i < spaceshipsArray.length; i++) {
      for (var j in spaceshipsArray[i]) {
        if (spaceshipsArray[i][j] === null) {
          spaceshipsArray[i][j] = "unknown";
        }
      }
    }
    return spaceshipsArray;
  }



  // 4. feladat
  function createHtmlElements(spaceshipsArray) {
    var spaceshipListDivElement = document.querySelector(".shapceship-list");

    for (var i = 0; i < spaceshipsArray.length; i++) {

      var cardDivElement = document.createElement('div');
      cardDivElement.classList.add("card");
      spaceshipListDivElement.appendChild(cardDivElement);

      var cardDivElementPhoto = document.createElement("img");
      cardDivElementPhoto.classList.add("image-spaceship");
      cardDivElement.appendChild(cardDivElementPhoto);
      cardDivElementPhoto.src = "img/" + spaceshipsArray[i].image;
      cardDivElementPhoto.alt = spaceshipsArray[i].model;

      var cardDivElementName = document.createElement("div");
      cardDivElementName.classList.add("model-spaceship");
      cardDivElement.appendChild(cardDivElementName);
      cardDivElementName.innerText = spaceshipsArray[i].model;

      var cardDivElementProperties = document.createElement("div");
      cardDivElementProperties.classList.add("model-spaceship");
      cardDivElement.appendChild(cardDivElementProperties);

      var k = '';
      for (var element in spaceshipsArray[i]) {
        k += element + ': ' + spaceshipsArray[i][element] + '<br/>';
      }
      cardDivElementProperties.innerHTML = k;
    }
  };

  //5. feladat
  function statistic(spaceshipsArray) {
    var spaceshipListDivElement = document.querySelector(".shapceship-list");

    var darab = 0;
    for (var i = 0; i < spaceshipsArray.length; i++) {
      if (spaceshipsArray[i].crew == 1) {
        darab++;
      }
    }

    var max = spaceshipsArray[0].cargo_capacity;
    for (var i = 1; i < spaceshipsArray.length; i++) {
      if (spaceshipsArray[i].cargo_capacity > max) {
        max = spaceshipsArray[i];
      }
    };
    var passangersSum = 0;
    for (var i = 0; i < spaceships.length; i++) {
      passangersSum += parseInt(spaceships[i].passengers);
    };

    var lengthinessShip = spaceships[0].lengthiness;
    for (var i = 0; i < szamokhalmaza.length; i++) {
      if (spaceships[i].lengthiness < lengthinessShip) {
        lengthinessShip = spaceships[i].lengthiness;
      }
    };

    var StatisticDivElement = document.createElement('div');
    spaceshipListDivElement.appendChild(StatisticDivElement);
    StatisticDivElement.innerHTML = "Egy fős legénységgel rendelkező hajók darabszáma: " + darab + "<br>" + "A legnagyobb cargo_capacity-vel rendelkező hajó neve: " + max + "<br>"

  };
  //6.feladat

  function DivUpdate(spaceships) {
    var detailsDivElement = document.querySelector(".one-spaceship");
    var detailsDivElementImage = document.createElement('img');
    detailsDivElement.appendChild(detailsDivElementImage);
    detailsDivElementImage.src = "img/" + spaceships[i].image;
    detailsDivElementImage.alt = spaceships[i].model;

    var detailsDivElementName = document.createElement('div');
    detailsDivElement.appendChild(detailsDivElementName);
    detailsDivElementName.classList.add("spaceshipName")
    detailsDivElementName.innerText = spaceships[i].model;
  };

  function searchCharacter(spaceships) {
    var searchTextBox = document.querySelector("#search-text")
    var filter = searchTextBox.value;

    var filtered;

    for (var i = 0; i < spaceships.length; i++) {
      if (spaceships[i].model.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
        filtered = (spaceships[i]);
        break;
      }
    }
    if (filtered) {
      DivUpdate(filtered)
    } else {
      var detailsDivElement = document.querySelector(".one-spaceship");
      detailsDivElement.innerText = "Ship not found";
    }
  };

  sortSpaceships(userDatas);
  consumablesNotNull(userDatas);
  nullToUnknown(userDatas);
  createHtmlElements(userDatas);
  statistic(userDatas);
  DivUpdate(userDatas)
  searchCharacter(userDatas)


  getData('/json/spaceshipsArray.json', successAjax);
};
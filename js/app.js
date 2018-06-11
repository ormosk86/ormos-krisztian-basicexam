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
  console.log(userDatas);
  sortSpaceships(userDatas);
  createHtmlElements(userDatas);

  var searchbuttonElement = document.querySelector('#search-button');
  searchbuttonElement.addEventListener('click', function () {
    searchCharacter(userDatas);
  }, false);

  statistic(userDatas);
}

getData('/json/spaceships.json', successAjax);


// 1. feladat
function sortSpaceships(spaceships) {
  spaceships = spaceships.sort(function (lho, rho) {
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

function consumablesNotNull(spaceships) {
  for (var i = spaceships.length - 1; i >= 0; --i) {
    if (spaceships[i].consumables == null) {
      spaceships.splice(i, 1);
    }
  }
  return spaceships;
}



// 3. feladat
function nullToUnknown(spaceships) {
  for (var i = 0; i < spaceships.length; i++) {
    for (var j in spaceships[i]) {
      if (spaceships[i][j] === null) {
        spaceships[i][j] = "unknown";
      }
    }
  }
  return spaceships;
}



// 4. feladat
function createHtmlElements(spaceships) {
  var spaceshipListDivElement = document.querySelector(".shapceship-list");

  for (var i = 0; i < spaceships.length; i++) {

    var cardDivElement = document.createElement('div');
    cardDivElement.classList.add("card");
    spaceshipListDivElement.appendChild(cardDivElement);

    var cardDivElementImage = document.createElement("img");
    cardDivElementImage.classList.add("image-spaceship");
    cardDivElement.appendChild(cardDivElementImage);
    cardDivElementImage.src = "img/" + spaceships[i].image;
    cardDivElementImage.alt = spaceships[i].model;

    var cardDivElementName = document.createElement("div");
    cardDivElementName.classList.add("model-spaceship");
    cardDivElement.appendChild(cardDivElementName);
    cardDivElementName.innerText = spaceships[i].model;

    var cardDivElementDetails = document.createElement("div");
    cardDivElementDetails.classList.add("model-spaceship");
    cardDivElement.appendChild(cardDivElementName);

    var s = '';
    for (var member in spaceships[i]) {
      s += member + ': ' + spaceships[i][member] + '<br/>';
    }
    cardDivElementDetails.innerText = s;
  }
};

//5. feladat
// Készítened kell egy statisztikát, mely a shapceship-list class-ű div aljára a következő adatokat fogja beleírni:
// -Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
// -A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
// -Az összes hajó utasainak (passengers) összesített száma
// -A leghosszabb(lengthiness) hajó képe
function statistic(spaceships) {
  var spaceshipListDivElement = document.querySelector(".shapceship-list");

  var darab = 0;
  for (var i = 0; i < spaceships.length; i++) {
    if (spaceships[i].crew == 1) {
      darab++;
    }
  }

  var max = spaceships[0].cargo_capacity;
  for (var i = 1; i < spaceships.length; i++) {
    if (spaceships[i].cargo_capacity > max) {
      max = spaceships[i];
    }
  };



  var StatisticDivElement = document.createElement('div');
  spaceshipListDivElement.appendChild(StatisticDivElement);
  StatisticDivElement.innerHTML = "Egy fős legénységgel rendelkező hajók darabszáma: " + darab + "<br>" + "A legnagyobb cargo_capacity-vel rendelkező hajó neve: " + max + "<br>"


};


//6.feladat
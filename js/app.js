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

  var StarWarsShips = [
    userDatas[2].data
  ]
  console.log(StarWarsShips);

  function OrderBy(charactersDatabase) {
    var i = charactersDatabase.length;
    var swap = false;
    do {
      swap = false;
      for (var j = 0; j < i - 1; j++) {
        if (charactersDatabase[j].cost_in_credits > charactersDatabase[j + 1].cost_in_credits) {
          [charactersDatabase[j], charactersDatabase[j + 1]] = [charactersDatabase[j + 1], charactersDatabase[j]]
          swap = true;
        }
      }
      i--;
    } while (swap)
    return charactersDatabase;
  };
  console.log(OrderBy(StarWarsShips));

  function torol(charactersDatabase) {
    for (i = 0; i < charactersDatabase.length; i++)
      if (charactersDatabase[i].consumables == "null") {
        charactersDatabase.splice(i, 1)
      }
    return charactersDatabase;
  };
  console.log(torol(StarWarsShips));

  function changeNull(charactersDatabase) {
    {
      for (i = 0; i < charactersDatabase.length; i++)
        if (charactersDatabase.cargo_capacity == "null") {
          charactersDatabase.cargo_capacity = "unknown"
        }
    } {
      for (i = 0; i < charactersDatabase.length; i++)
        if (charactersDatabase.consumables == "null") {
          charactersDatabase.consumables = "unknown"
        }
    } {
      for (i = 0; i < charactersDatabase.length; i++)
        if (charactersDatabase.cost_in_credits == "null") {
          charactersDatabase.cost_in_credits = "unknown"
        }
    } {
      for (i = 0; i < charactersDatabase.length; i++)
        if (charactersDatabase.crew == "null") {
          charactersDatabase.crew = "unknown"
        }
    } {
      for (i = 0; i < charactersDatabase.length; i++)
        if (charactersDatabase.lengthiness == "null") {
          charactersDatabase.lengthiness = "unknown"
        }
    } {
      for (i = 0; i < charactersDatabase.length; i++)
        if (charactersDatabase.max_atmospheric_speed == "null") {
          charactersDatabase.max_atmospheric_speed = "unknown"
        }
    } {
      for (i = 0; i < charactersDatabase.length; i++)
        if (charactersDatabase.passengers == "null") {
          charactersDatabase.passengers = "unknown"
        }

    };
    return charactersDatabase;
  }
}

getData('/json/spaceships.json', successAjax);
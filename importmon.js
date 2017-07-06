function generateRandomPokemon(callback) {
  // "constants"
  var MAX_POKEMON_ID = 718,
      BASE_URL = "http://pokeapi.co";
  
  var fetches = [], // array to hold fetch operations
      pokemon = {}; // object to hold random pokemon data
  
  function getRandomID() {
    return 1 + Math.random() * MAX_POKEMON_ID | 0; // bitwise floor() trick
  }
  
  function fetchRandom(endpoint, callback) {
    var url = BASE_URL + "/api/v1/" + endpoint + "/" + getRandomID();
    return $.ajax({
      type: "GET",
      url: url,
      dataType: "jsonp",
      success: callback
    });
  }
  
  // fetch a random name
  fetches.push(fetchRandom('pokemon', function (data) {
    pokemon.name = data.name;
  }));
  
  // fetch random types
  fetches.push(fetchRandom('pokemon', function (data) {
    pokemon.types = data.types.map(function (type) {
      return type.name;
    });
  }));
  
  // fetch random abilities
  fetches.push(fetchRandom('pokemon', function (data) {
    pokemon.abilities = data.abilities.map(function (type) {
      return type.name;
    });
  }));
  
  // fetch random sprite
  fetches.push(fetchRandom('sprite', function (data) {
    pokemon.image = BASE_URL + data.image;
  }));
  
  // when all the fetches are done, trigger the callback with
  // the pokemon object.
  // If there was an error, trigger it with null (not really
  // informative, but better than nothing)
  $.when.apply(null, fetches)
    .done(function () {
      callback(pokemon);
    })
    .fail(function () {
      callback(null);
    });
}

// ---------------------

function displayRandomPokemon() {
  generateButton.prop("disabled", true);
  
  generateRandomPokemon(function (data) {
    generateButton.prop("disabled", false);
  
    if(!data) {
      alert("Oops"); // an error occurred
      return;
    }
  
    // output example
    var properties = [];
    properties.push("Name: " + data.name);
    properties.push("Types: " + data.types.join(", "));
    properties.push("Abilities: " + data.abilities.join(", "));
    $("#output").empty().text(properties.join("\n"));
  
    $("#sprite").attr("src", data.image);
  });
}

var generateButton = $("#generate");

generateButton.on("click", displayRandomPokemon);

// run on load
displayRandomPokemon();
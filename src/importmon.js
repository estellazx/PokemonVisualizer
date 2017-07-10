import React, { Component } from 'react';
import axios from 'axios';

//////////////////////////////////////////////////////

export default class GetPoke extends Component{
    constructor(){
        super();
          this.state ={
              fetches: [], 
              pokemon: {}, 
              list: []
          }
        this.BASE_URL = "http://pokeapi.co";
        this.fetchPoke = this.fetchPoke.bind(this);
        this.addList = this.addList.bind(this);
    }
    componentDidMount(){
        this.fetchPoke();
    }
    fetchPoke(endpoint, callback) {
        var x;
        for(x = 1; x <= 10; x++){
            debugger
            var url = this.BASE_URL + "/api/v1/pokemon/" + x+"/";
            console.log(url);
            axios.get(url)
              .then((response) => {
                  var bst = response.data.attack + response.data.hp + response.data.speed +response.data.sp_atk + response.data.sp_def;
                this.setState({

                })
                this.state.pokemon = {
                    bst: bst,
                    atck: response.data.attack,
                    spatck: response.data.sp_atk,
                    def: response.data.defense,
                    spdef: response.data.sp_def,
                    spd: response.data.speed
                }
                this.addList(response.data);
              })
        }
    }
    addList(pokemon){
      debugger
        this.setState({
            list: this.state.list.concat([pokemon])
        })
    }
    render(){
        console.log(this.state);
        return(
            <div>
                <DisplayList list={this.state.list}/>
            </div>
        );
    }
} 

class DisplayList extends Component{
    render(){
        const pokelist = this.props.list.map( (pokemon,index) => {
        return <h3 key={index}>{pokemon.name}</h3>;
      });
        return(
            <div>
                    {pokelist}
            </div>
        )
    }
}

// function generateRandomPokemon(callback) {
//   // "constants"
//   var MAX_POKEMON_ID = 718,
//       BASE_URL = "http://pokeapi.co";
  
//   var fetches = [], // array to hold fetch operations
//       pokemon = {}; // object to hold random pokemon data
  
//   function getRandomID() {
//     return 1 + Math.random() * MAX_POKEMON_ID | 0; // bitwise floor() trick
//   }
  
//   function fetchRandom(endpoint, callback) {
//     var url = BASE_URL + "/api/v1/" + endpoint + "/" + getRandomID();
//     return $.ajax({
//       type: "GET",
//       url: url,
//       dataType: "jsonp",
//       success: callback
//     });
//   }
  
//   // fetch a random name
//   fetches.push(fetchRandom('pokemon', function (data) {
//     pokemon.name = data.name;
//   }));
  
//   // fetch random types
//   fetches.push(fetchRandom('pokemon', function (data) {
//     pokemon.types = data.types.map(function (type) {
//       return type.name;
//     });
//   }));
  
//   // fetch random abilities
//   fetches.push(fetchRandom('pokemon', function (data) {
//     pokemon.abilities = data.abilities.map(function (type) {
//       return type.name;
//     });
//   }));
  
//   // fetch random sprite
//   fetches.push(fetchRandom('sprite', function (data) {
//     pokemon.image = BASE_URL + data.image;
//   }));
  
//   // when all the fetches are done, trigger the callback with
//   // the pokemon object.
//   // If there was an error, trigger it with null (not really
//   // informative, but better than nothing)
//   $.when.apply(null, fetches)
//     .done(function () {
//       callback(pokemon);
//     })
//     .fail(function () {
//       callback(null);
//     });
// }



// // ---------------------

// function displayRandomPokemon() {
//   generateButton.prop("disabled", true);
  
//   generateRandomPokemon(function (data) {
//     generateButton.prop("disabled", false);
  
//     if(!data) {
//       alert("Oops"); // an error occurred
//       return;
//     }
  
//     // output example
//     var properties = [];
//     properties.push("Name: " + data.name);
//     properties.push("Types: " + data.types.join(", "));
//     properties.push("Abilities: " + data.abilities.join(", "));
//     $("#output").empty().text(properties.join("\n"));
  
//     $("#sprite").attr("src", data.image);
//   });
// }

// // var generateButton = $("#generate");

// // generateButton.on("click", displayRandomPokemon);

// // // run on load
// // displayRandomPokemon();
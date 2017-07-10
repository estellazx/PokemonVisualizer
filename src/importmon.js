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
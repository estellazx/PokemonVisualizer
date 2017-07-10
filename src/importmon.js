import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

//////////////////////////////////////////////////////

export default class GetPoke extends Component{
    constructor(){
        super();
          this.state ={
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
        for(x = 1; x <= 151; x++){
            var url = this.BASE_URL + "/api/v1/pokemon/" + x+"/";
            axios.get(url)
              .then((response) => {
                  var bst = response.data.attack + response.data.hp + response.data.speed +response.data.sp_atk + response.data.sp_def;
                  var obj = {
                        id: response.data.national_id,
                        name: response.data.name,
                        pic: 'images/official-artwork/'+response.data.national_id+".png",
                        bst: bst,
                        atk: response.data.attack,
                        spatk: response.data.sp_atk,
                        def: response.data.defense,
                        spdef: response.data.sp_def,
                        spd: response.data.speed
                    }

                this.addList(obj);
              })
        }
    }
    addList(pokemon){
        //console.log([pokemon]);
        this.setState({
            list: this.state.list.concat([pokemon])
        })
    }
    render(){
        return(
            <div>
                <DisplayList list={this.state.list}/>
            </div>
        );
    }
} 

class DisplayList extends Component{
    render(){

        var sorted = this.props.list;
        sorted = _.orderBy(sorted, ['bst'],['desc']); // Use Lodash to sort array by 'name'
        // this.setState({list: chars})
        const pokelist = sorted.map( (pokemon,index) => {
        return <h3 key={index}>{pokemon.name}<img src={pokemon.pic}></img></h3>;
      });
        return(
            <div>
                    {pokelist}
            </div>
        )
    }
}

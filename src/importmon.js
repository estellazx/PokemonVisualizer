import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom';
//////////////////////////////////////////////////////

export default class GetPoke extends Component {
    constructor(){
        super();
        this.state = {
            list: []
        }
        this.BASE_URL = "http://pokeapi.co";
        this.fetchPoke = this.fetchPoke.bind(this);
        this.addList = this.addList.bind(this);
    }
    componentDidMount() {
        this.fetchPoke();
    }
    fetchPoke(endpoint, callback) {
        var x;
        var arr = [];
        var max = 400;
        for(x = 1; x <= max; x++) {
            var url = this.BASE_URL + "/api/v1/pokemon/" + x + "/";
            axios.get(url)
            .then((response) => {
                var bst = response.data.attack + response.data.defense + response.data.hp + response.data.speed + response.data.sp_atk + response.data.sp_def;
                var y; 
                var ability = '';
                for(y = 0; y < response.data.abilities.length; y++){
                    if(y===0){
                        ability += response.data.abilities[y].name;
                    } else{
                        ability += ", " + response.data.abilities[y].name;
                    }
                }

                var obj = {
                    id: response.data.national_id,
                    name: response.data.name,
                    pic: 'images/official-artwork/'+response.data.national_id+".png",
                    //pic: 'images/researchnow.png',
                    bst: bst,
                    hp: response.data.hp,
                    atk: response.data.attack,
                    spatk: response.data.sp_atk,
                    def: response.data.defense,
                    spdef: response.data.sp_def,
                    spd: response.data.speed,
                    ability: ability,
                    height: response.data.height,
                    type: response.data.types
                }
                this.props.updatePoke(response.data.name);
                arr.push(obj);
                if(arr.length === max){
                    this.addList(arr);
                }
                //this.addList(obj);
            })
        }
        
    }
    addList(pokemon) {
        this.props.finishLoading();
        this.setState({
            list: pokemon 
        })
    }
    render(){
        return(
            <DisplayList list={this.state.list} input={this.props.input.value} showResults={this.state.showResults}/>
        );
    }
} 

class DisplayList extends Component {
    render(){
        var sorted = this.props.list;
        sorted = _.orderBy(sorted, [this.props.input],['desc']);
        //this.setState({list: sorted})
        const pokelist = sorted.map( (pokemon,index) => {
            return (
              <div id='row' key={pokemon.id}>
                <DisplayListInfo pokemon={pokemon} key={pokemon.id} rank={index}/>
              </div>
            )
        });
        return(
            <div id='list'>
                { pokelist }
            </div>
        )
    }
}

class Results extends Component {
    render() {
        const typelist = this.props.pokemon.type.map((type,index) => {
            return (
                <Link key={index} to={`/type/${type.name}`}>{type.name}</Link>
            )
        });
        return (
            <div id="results" className="search-results">
                <h4 id="res_type" className='moreinfo'>
                    Type: {typelist}
                </h4>
                <h4 id="res_ability" className='moreinfo'>
                    {"Abilities: " + this.props.pokemon.ability}
                </h4>
                <h4 id="res_stats" className='moreinfo'>
                    {"Statistics: "}
                    <lu>
                        <li>{"Hp: " + this.props.pokemon.hp}</li>
                        <li>{"Attack: " + this.props.pokemon.atk}</li>
                        <li>{"Defense: " + this.props.pokemon.def}</li>
                        <li>{"Special Attack: " + this.props.pokemon.spatk}</li>
                        <li>{"Special Defense: " + this.props.pokemon.spdef}</li>
                        <li>{"Speed: " + this.props.pokemon.spd}</li>
                        <li>{"Total: " + this.props.pokemon.bst}</li>
                    </lu>
                </h4>
            </div>
        );
    }
}

class DisplayListInfo extends Component {
    constructor(){
        super();
        this.state = {
            showResults: false,
            rank: 0
        }
        this.onClick = this.onClick.bind(this);
        this.getRank = this.getRank.bind(this);
    }
    onClick() {
        this.setState({ showResults: !this.state.showResults });
    }
    getRank() {
        var rank = "#" + (this.props.rank+1);
        this.setState({
            rank: rank
        })
    }
    render() {
        return(
            <div id="rowInner">
                {this.state.showResults ? <Results pokemon={this.props.pokemon} rank={this.props.rank}/> : null }
                <div className='pokeinfo' onClick={this.onClick}>
                    <h3 key={this.props.pokemon.name} id="pokename" >
                        {"#" + (this.props.rank+1) + " "}
                        {this.props.pokemon.name}
                    </h3>
                    <div id="image">
                        <img src={this.props.pokemon.pic} id='pokepic'></img>
                    </div>
                </div>
            </div>
        )
    }
}


 // <Link to={`/type/${type.name}`}>{type.name}</Link>
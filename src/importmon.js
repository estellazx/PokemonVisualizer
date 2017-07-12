import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
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
        for(x = 30; x <= 40; x++) {
            var url = this.BASE_URL + "/api/v1/pokemon/" + x + "/";
            axios.get(url)
            .then((response) => {
                var bst = response.data.attack + response.data.hp + response.data.speed + response.data.sp_atk + response.data.sp_def;
                var x, y; 
                var type = '';
                var ability = '';
                for(x = 0; x < response.data.types.length; x++){
                    type += response.data.types[x].name + " ";
                }
                for(y = 0; y < response.data.abilities.length; y++){
                    ability += response.data.abilities[y].name + " ";
                }

                var obj = {
                    id: response.data.national_id,
                    name: response.data.name,
                    //pic: 'images/official-artwork/'+response.data.national_id+".png",
                    pic: 'images/researchnow.png',
                    bst: bst,
                    hp: response.data.hp,
                    atk: response.data.attack,
                    spatk: response.data.sp_atk,
                    def: response.data.defense,
                    spdef: response.data.sp_def,
                    spd: response.data.speed,
                    ability: ability,
                    height: response.data.height,
                    type: type
                }
                this.addList(obj);
            })
        }
    }
    addList(pokemon) {
        //console.log([pokemon]);
        this.setState({
            list: this.state.list.concat([pokemon])
        })
    }
    render(){
        return(
            <div>
                <DisplayList list={this.state.list} input={this.props.input.value} showResults={this.state.showResults}/>
            </div>
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
                <div id='row' key={index}>
                    <DisplayListInfo pokemon={pokemon} key={index} rank={index}/>
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
        return (
            <div id="results" className="search-results">
                {this.props.rank}
                {this.props.pokemon.name}
                {this.props.pokemon.type}
                {this.props.pokemon.ability}
                {this.props.pokemon.atk}
            </div>
        );
    }
}

class DisplayListInfo extends Component {
    constructor(){
        super();
        this.state = {
            showResults: false
        }
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.setState({ showResults: !this.state.showResults });
    }
    render(){
        return(
            <div>
                {this.state.showResults ? <Results pokemon={this.props.pokemon} rank={this.props.rank}/> : null }
                <div className='pokeinfo' onClick={this.onClick}>
                    <h3 key={this.props.pokemon.name} id="pokename" >
                        {this.props.pokemon.name}
                        
                    </h3>
                    <img src={this.props.pokemon.pic} id='pokepic'></img>
                </div>
            </div>
        )
    }
}


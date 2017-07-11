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
        for(x = 30; x <= 40; x++){
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
                <DisplayList list={this.state.list} input={this.props.input.value} showResults={this.state.showResults}/>
            </div>
        );
    }
} 

class DisplayList extends Component{
    constructor(){
        super();
        this.state={
            showResults: false
        }
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.setState({ showResults: !this.state.showResults });
    }
    render(){
        var sorted = this.props.list;
        sorted = _.orderBy(sorted, [this.props.input],['desc']);
        //this.setState({list: sorted})
        const pokelist = sorted.map( (pokemon,index) => {
            return <div key={index} id='row'><h3 key={pokemon.name} className='pokeinfo' onClick={this.onClick}>{pokemon.name}<img src={pokemon.pic} id='pokepic'></img></h3></div>;
        });
        return(
            <div id='list'>
                { this.state.showResults ? <Results /> : null }
                {pokelist}
            </div>
        )
    }
}

class Results extends Component{
    render() {
        return (
            <div id="results" className="search-results">
                I've been clicked
            </div>
        );
    }
}





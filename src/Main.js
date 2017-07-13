import React, { Component } from 'react';
import PickCat from './dropdown.js';
import GetPoke from './importmon.js';
import Loader from './loader.js';

export default class Main extends Component{
	constructor(){
        super();
		this.state = {
			input: { value: 'bst', label: 'Total Base Stats' },
			loading: true,
			loadingPoke: ''
		}
		this.logChange = this.logChange.bind(this);
		this.finishLoading = this.finishLoading.bind(this);
		this.updatePoke = this.updatePoke.bind(this);
    }
    logChange(val) {
        this.setState({
            input: val
        })
    }
    finishLoading(){
    	this.setState({
    		loading: false
    	})
    }
   	updatePoke(pokemon){
   		this.setState({
   			loadingPoke: pokemon
   		})
   	}
	render(){
		if(this.state.loading){
			return(
				<div>
					<Loader loadingPoke={this.state.loadingPoke}/>
					<GetPoke input={this.state.input} finishLoading={this.finishLoading} updatePoke={this.updatePoke}/>
				</div>
			)
		}
		else {
			return(
				<div>
					<div id="dropdown">
						<PickCat logChange={this.logChange} input={this.state.input}/>
					</div>
					{!!this.state.input.value && <GetPoke input={this.state.input} finishLoading={this.finishLoading} updatePoke={this.updatePoke}/>}
				</div>
			)
		}
	}
}

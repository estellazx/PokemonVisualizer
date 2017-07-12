import React, { Component } from 'react';
import PickCat from './dropdown.js';
import GetPoke from './importmon.js';

export default class Main extends Component{
	constructor(){
        super();
		this.state = {
			input: { value: 'bst', label: 'Total Base Stats' }
		}
		this.logChange = this.logChange.bind(this);
    }
    logChange(val) {
        this.setState({
            input: val
        })
    }
	render(){
		return(
			<div>
				<div id="dropdown">
				<PickCat logChange={this.logChange} input={this.state.input}/>
				</div>
				{!!this.state.input.value && <GetPoke input={this.state.input}/>}
			</div>
		)
	}
}

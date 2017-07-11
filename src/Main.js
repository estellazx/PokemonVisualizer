import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import PickCat from './dropdown.js';
import GetPoke from './importmon.js';

export default class Main extends Component{
	constructor(){
      super();
	      this.state = {
	          input: {}
	      }
	      this.logChange = this.logChange.bind(this);
    }
    logChange(val) {
        this.setState({
            input: val
        })
        console.log("Selected: " + val);
    }
	render(){
		return(
			<div>
				<PickCat logChange={this.logChange} input={this.state.input}/>
				{!!this.state.input.value && <GetPoke input={this.state.input}/>}
			</div>
		)
	}
}
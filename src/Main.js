import React, { Component } from 'react';
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
    }
	render(){
		return(
			<div>
				<PickCat logChange={this.logChange} input={this.state.input}/>
				{<GetPoke input={this.state.input}/>}
			</div>
		)
	}
}

// !!this.state.input.value && 
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React, { Component } from 'react';

export default class PickCat extends Component{
    render(){
        var options = [
            { value: 'bst', label: 'Total Base Stats' },
            { value: 'atk', label: 'Attack' },
            { value: 'spatk', label: 'Special Attack' },
            { value: 'def', label: 'Defense' },
            { value: 'spdef', label: 'Special Defense' },
            { value: 'spd', label: 'Speed' }
        ];
        return(
            <div id="innerdropdown">
                <Select
                    name="form-field-name"
                    value={this.props.input.value}
                    options={options}
                    onChange={this.props.logChange}
                />
            </div>
        )
    }
}
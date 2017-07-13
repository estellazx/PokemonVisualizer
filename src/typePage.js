import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom';
//////////////////////////////////////////////////////

export default class TypePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.match.params.type,
            halffrom: [],
            halfto: [],
            nofrom: [],
            noto: [],
            doublefrom: [],
            doubleto: []
        }
        this.fetchType = this.fetchType.bind(this);
    }
    componentDidMount() {
        this.fetchType(this.props.match.params.type);
    }
    componentWillReceiveProps(nextProps){
        this.fetchType(nextProps.match.params.type);
    }
    fetchType(type){
        var url = "http://pokeapi.co/api/v2/type/" + type + "/";
        axios.get(url).then((res) => {
            var dr = res.data.damage_relations;
            this.setState({
                name: res.data.name,
                halffrom: dr.half_damage_from,
                halfto: dr.half_damage_to,
                nofrom: dr.no_damage_from,
                noto: dr.no_damage_to,
                doublefrom: dr.double_damage_from,
                doubleto: dr.double_damage_to
            });
        })
    }

    render(){
        const halffromlist = this.state.halffrom.map( (info,index) => {
            return (
                <li key={index}><Link to={`/type/${info.name}`} key={index}>{info.name}</Link></li>
            )
        });
        const doublefromlist = this.state.doublefrom.map( (info,index) => {
            return (
                <li key={index}><Link to={`/type/${info.name}`} key={index}>{info.name}</Link></li>
            )
        });
        const halftolist = this.state.halfto.map( (info,index) => {
            return (
                <li key={index}><Link to={`/type/${info.name}`} key={index}>{info.name}</Link></li>
            )
        });
        const doubletolist = this.state.doubleto.map( (info,index) => {
            return (
                <li key={index}><Link to={`/type/${info.name}`} key={index}>{info.name}</Link></li>
            )
        });
        return(
            <div>
                <div className="typetitle">
                    {this.state.name}
                </div>
                <div className="outerdiv">
                    <div className="todiv">
                        <div className="damage" id="sto">
                            <h4 className="damagetype">Super effective attacking: </h4> <lu className="damagelist">{doubletolist}</lu>
                        </div>
                        <div className="damage" id="wto">
                            <h4 className="damagetype">Not very effective attacking: </h4> <lu className="damagelist">{halftolist}</lu>
                        </div>
                    </div>
                    <div className="fromdiv">
                        <div className="damage" id="sfrom">
                            <h4 className="damagetype">Super Effective defending from: </h4> <lu className="damagelist">{halffromlist}</lu>
                        </div>
                        <div className="damage" id="wfrom">
                            <h4 className="damagetype"> Not very effective defending from: </h4><lu className="damagelist">{doublefromlist}</lu>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

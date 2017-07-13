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
        console.log(this.props);
        const halffromlist = this.state.halffrom.map( (info,index) => {
            return (
                <Link to={`/type/${info.name}`} key={index}>{info.name}</Link>
            )
        });
        return(
            <div className="outerdiv">
                <div className="todiv">
                    <div className="sto">
                    </div>
                    <div className="wto">
                    </div>
                </div>
                <div className="fromdiv">
                    <div className="sfrom">
                    </div>
                    <div className="wfrom">
                    </div>
                </div>
            </div>
        );
    }
} 

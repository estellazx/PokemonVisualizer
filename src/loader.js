import React, { Component } from 'react';

export default class Loader extends Component {
    render() {
      return (
        <div className="background">
          <img src="images/loading.gif"/>
          <p className="loadingName">
              Loading... {this.props.loadingPoke}
          </p>
        </div>
      ); 
    }
}
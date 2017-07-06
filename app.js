import {FruitList} from './fruits.js';

class Main extends React.Component {
		render(){
			debugger
    	return (
    		<div></div>
      	)	
    }
}

// class FruitList extends React.Component {
// 	constructor(){
//   	super();
//     this.state = {
//     	fruits: []
//     }
//   }
// 	componentDidMount(){
//   	//api call
//     //getData();
//     this.setState({
//     	fruits: data
//     });
//   }
// 	render(){
//   	const fruits = this.state.fruits.map( (_fruit,index) => {
//     	return <li key={index}>{_fruit}</li>;
//     });
//   	return (
//     	<ul>
//       	{fruits}
//       </ul>
//     )
//   }
// }

ReactDOM.render(<Main />, document.getElementById('root'));
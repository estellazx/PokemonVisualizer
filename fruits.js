const data = ['apples', 'oranges', 'grapes', 'oranges', 'watermelon'];

class FruitList extends React.Component {
  constructor(){
    super();
    this.state = {
      fruits: []
    }
  }
  componentDidMount(){
    //api call
    //getData();
    this.setState({
      fruits: data
    });
  }
  render(){
    const fruits = this.state.fruits.map( (_fruit,index) => {
      return <li key={index}>{_fruit}</li>;
    });
    return (
      <ul>
        {fruits}
      </ul>
    )
  }
}
module.exports = { FruitList };
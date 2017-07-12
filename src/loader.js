class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); 
  }
  
  render() {
    const { loading } = this.state;
    
    if(loading) {
      return null; // render null when app is not ready
    }
    
    return (
      <div>I'm the app</div>
    ); 
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
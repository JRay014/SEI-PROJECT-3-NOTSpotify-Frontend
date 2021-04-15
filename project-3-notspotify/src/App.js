import React, { Component } from 'react'
import './App.css';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      baseURL: '',
      apikey: `apikey=${process.env.REACT_APP_API_KEY}`,
      query: '',
      songs: [],
      searchURL: ''
    }
  }
}



function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
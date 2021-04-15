import React, { Component } from 'react'
import './App.css';
import Playlist from "./Playlist.js"

let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        playlist: [],
    }
  }

  getPlaylist = async() => {
    const response = await fetch(baseUrl + "/notspotify")
    const parseData = await response.json()
    this.setState({
      playlist: parseData,
    })
  }

  componentDidMount() {
    this.getPlaylist()
  }

  render() {
    console.log(this.state.playlist)
    return (
      <div className="App">
        <Playlist />
      </div>
    );
  }

}

export default App;
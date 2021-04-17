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

  getPlaylist = async () => {
    const response = await fetch(baseUrl + "/notspotify")
    const parseData = await response.json()
    console.log(parseData)
    this.setState({
      playlist: parseData,
    })
  }

  deletePlaylist = async (id) => {
    const url = baseUrl + "/notspotify/" + id

    try {

      const response = await fetch(url, { method: "DELETE" })
      if (response.status === 200) {
        const index = this.state.playlist.findIndex(playlist => playlist._id === id)
        const copyPlaylist = [...this.state.playlist]

        copyPlaylist.splice(index, 1)
        this.setState({
          playlist: copyPlaylist
        })
      }
    }
    catch (err) {
      console.log('error: ', err)
    }
  }


  componentDidMount() {
    this.getPlaylist()
  }


  render() {
    console.log(this.state.playlist)
    return (
      <>
        <div className="buttons">
          <button onClick={this.deletePlaylist}> Delete Playlist </button>
          <button onCLick={this.addToPlaylist}> Add to Playlist </button>
          <button onClick={this.editPlaylist}> Edit Playlist </button>

        </div>

        <div className="App">

          {
            this.state.playlist.map(playlist => {
              return (
                <Playlist key={playlist._id} playlist={playlist} deletePlaylist={this.deletePlaylist} />
              )
            })
          }

        </div>
      </>
    );
  }
}


export default App;

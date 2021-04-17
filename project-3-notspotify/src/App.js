import React, { Component } from 'react'
import './App.css';
import Playlist from "./Playlist.js"
import NewPlaylist from "./NewPlaylistForm"

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
      rootURL: 'https://api.musixmatch.com/ws/1.1/?',
      apiKey: 'api_key=5nfSzNYdLo3RS2vckrwcsoDcCYVjBomy',
      query: '&q=',
      queryURL: '',
      querySongs: [],
      playlist: [],
      newPlaylistForm: false
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

  getSong = async () => {
    const response = await fetch(this.state.rootURL + this.state.apiKey + this.state.query + this.state.queryURL)
    const parseData = await response.json()
    console.log(parseData)
    this.setState({
      querySongs: parseData,
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

  //To add new playlist
  handleNewPlaylist = () => {
    console.log(this.state.playlistNameEdit)
    this.setState({
      newPlaylistForm: !this.state.newPlaylistForm
    })
  }

  addPlaylist = (newPlaylist) => {
    const copyPlaylist = [...this.state.playlist]
    copyPlaylist.push(newPlaylist)
    this.setState({
      playlist: copyPlaylist
    })
  }


  componentDidMount() {
    this.getPlaylist()
  }


  render() {
    console.log(this.state.playlist)
    return (
      <>
        <div className="App-buttons">
          <button onClick={this.handleNewPlaylist}> Add Playlist </button>
        </div>


        <div className="App">
          {
            this.state.newPlaylistForm
              ? <NewPlaylist baseUrl={baseUrl} addPlaylist={this.addPlaylist} />
              : ''
          }

          {
            this.state.playlist.map(playlist => {
              return (
                <Playlist baseUrl={baseUrl} id={playlist._id} playlist={playlist} deletePlaylist={this.deletePlaylist} />
              )
            })
          }

        </div>
      </>
    );
  }
}


export default App;

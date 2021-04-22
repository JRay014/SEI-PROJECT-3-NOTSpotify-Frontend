import React, { Component } from 'react'
import Playlist from "./Playlist.js"
import NewPlaylist from "./NewPlaylistForm"
import AddSong from "./AddSong"

import "./UserHomepage.css"

let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rootURL: 'https://api.musixmatch.com/ws/1.1/track.search?',
      apiKey: 'apikey=54340e8a4266915b118c498fc98c1f6f',
      query: '&q=',
      queryURL: '',
      querySongs: [],
      playlist: [],
      newPlaylistForm: false,
      // currentUser: {}
    }
  }

  getPlaylist = async () => {
    const response = await fetch(baseUrl + "/notspotify")
    const parseData = await response.json()
    // console.log(parseData)
    this.setState({
      playlist: parseData,
      // currentUser: this.props.currentUser
    })
  }

  // getSong = async (event) => {
  //   event.preventDefault()
  //   try {
  //     console.log(this.state.rootURL + this.state.apiKey + this.state.query + 'Rivers%20and%20Roads')
  //     const response = await fetch(this.state.rootURL + this.state.apiKey + this.state.query + 'Rivers%20and%20Roads')
  //     const parseData = await response.json()
  //     console.log(parseData)
  //     this.setState({
  //       querySongs: parseData,
  //       queryURL: ''
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  deletePlaylist = async (id) => {
    const url = baseUrl + "/notspotify/" + id

    try {

      const response = await fetch(url, { method: "DELETE", mode: 'cors', credentials: 'include' })
      if (response.status === 200) {
        const index = this.state.playlist.findIndex(playlist => playlist._id === id)
        const copyPlaylist = [...this.state.playlist]

        copyPlaylist.splice(index, 1)
        this.setState({
          playlist: copyPlaylist
        })
        console.log(await response.json());
      }
    }
    catch (err) {
      console.log('error: ', err)
    }
  }

  //To add new playlist
  handleNewPlaylist = () => {

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
    console.log(this.props.currentUser)
    console.log(this.state.playlist)

    return (
      <>

        {/* <AddSong playlists={this.state.playlist} currentUser={this.props.currentUser} /> */}

        <div className="App-newplaylist">
          <button onClick={this.handleNewPlaylist}> Add Playlist </button>
        </div>


        <div className="App">
          {
            this.state.newPlaylistForm
              ? <NewPlaylist baseUrl={baseUrl} addPlaylist={this.addPlaylist} currentUser={this.props.currentUser} handleNewPlaylist={this.handleNewPlaylist} />
              : ''
          }

          {
            this.state.playlist.map(playlist => {
              return (
                playlist.author === this.props.currentUser._id
                  ? <Playlist baseUrl={baseUrl} id={playlist._id} playlist={playlist} deletePlaylist={this.deletePlaylist} />
                  : ''
              )
            })
          }

        </div>
      </>
    );
  }
}


export default Home;

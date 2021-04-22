import React, { Component } from 'react'
import Song from "./Song"
import './css/Playlist.css'
import AddSong from './AddSong'

class Playlist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songs: [],
      playlistName: '',
      id: null,
      playlistNameEdit: false
    }
  }

  // addSongs = () => {
  //   this.setState({
  //     songs: [...this.props.playlist.songs]
  //   })
  // }

  handleEdit = () => {
    console.log(this.state.playlistNameEdit)
    this.setState({
      playlistNameEdit: !this.state.playlistNameEdit
    })
  }

  handleChangeName = (event) => {
    // console.log(event.target.value)
    this.setState({
      playlistName: event.target.value,


    })
  }

  setValue = () => {
    this.setState({
      playlistName: this.props.playlist.name,
      id: this.props.id,
      songs: [...this.props.playlist.songs]
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(this.props.baseUrl + '/notspotify/' + this.state.id, {
        method: 'PUT',
        body: JSON.stringify({ name: this.state.playlistName }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(this.state.playlistName)
      this.setState({
        playlistNameEdit: !this.state.playlistNameEdit,
        // playlistName: this.state.playlistName
      })
    } catch (error) {
      console.log('Error: ', error)
    }

  }

  deleteSong = async (song) => {
    const url = this.props.baseUrl + "/notspotify/" + this.props.playlist._id

    try {
      const index = this.state.songs.findIndex(s => s.name === song.name && s.artist === song.artist)
      console.log(index)
      const copySongs = [...this.state.songs]
      console.log(copySongs)
      copySongs.splice(index, 1)
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          songs: copySongs
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {

        this.setState({
          songs: copySongs
        })
      }
    }
    catch (err) {
      console.log('error: ', err)
    }
  }


  componentDidMount() {
    this.setValue()
  }

  render() {

    return (
      //Add Delete to each song render
      <div className="Playlist">
        <div className="Playlist-header">
          {!this.state.playlistNameEdit
            ? <p onClick={() => this.handleEdit()}>{this.state.playlistName} </p>
            : <form onSubmit={(evt) => this.handleSubmit(evt)}>
              <label htmlFor="editPlaylistName"></label>
              <input id="editPlaylistName" type="text" value={this.state.playlistName} onChange={(evt) => this.handleChangeName(evt)} ></input>
              {/* <button type="submit"></button> */}
            </form>
          }

          <div className="Playlist-header-buttons">
            <button onClick={() => {
              this.props.deletePlaylist(this.props.playlist._id)
            }
            }>Delete</button>
            {/* <button onClick={() => this.handleEdit()}>Edit</button> */}
            <button>Add Song</button>
          </div>

        </div>



        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.songs.map((song) => {
                return (

                  <Song song={song} deleteSong={this.deleteSong} />

                )
              }
              )}
          </tbody>
        </table>


      </div>
    )
  }
}

export default Playlist

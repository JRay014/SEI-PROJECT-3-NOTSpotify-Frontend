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
      playlistNameEdit: false,
      addSongForm: false
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
      await fetch(this.props.baseUrl + '/notspotify/' + this.state.id, {
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
  addSong = async (song) => {
    const url = this.props.baseUrl + "/notspotify/" + this.props.playlist._id

    try {

      const copySongs = [...this.state.songs]
      // console.log(copySongs)
      copySongs.push(song)
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


  addSongFormHandle = () => {
    this.setState({
      addSongForm: !this.state.addSongForm
    })
  }


  componentDidMount() {
    this.setValue()
  }

  render() {
    // console.log(this.state.addSongForm)

    return (
      //Add Delete to each song render
      <div className="Playlist">
        <div className="Playlist-header">

          {!this.state.playlistNameEdit
            ? <h2 onClick={() => this.handleEdit()}>{this.state.playlistName} </h2>
            : <form onSubmit={(evt) => this.handleSubmit(evt)}>
              <label htmlFor="editPlaylistName"></label>
              <input className="Playlist-name-edit" id="editPlaylistName" type="text" value={this.state.playlistName} onChange={(evt) => this.handleChangeName(evt)} ></input>
              {/* <button type="submit"></button> */}
            </form>
          }

          <div className="Playlist-header-buttons">
            <button className="Playlist-delete" onClick={() => {
              this.props.deletePlaylist(this.props.playlist._id)
            }
            }>Delete Playlist</button>
            {/* <button onClick={() => this.handleEdit()}>Edit</button> */}
            <button className="Playlist-add" onClick={() => this.addSongFormHandle()}>Add Song</button>
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
              this.state.songs.map((song, i) => {
                return (

                  <Song song={song} deleteSong={this.deleteSong} key={i} />

                )
              }
              )}
          </tbody>
        </table>
        {this.state.addSongForm
          ? <AddSong addSong={this.addSong} />
          : ''
        }

      </div>
    )
  }
}

export default Playlist

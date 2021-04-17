import React, { Component } from 'react'
import './Playlist.css'

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


  componentDidMount() {
    this.setValue()
  }

  render() {

    return (
      //Add Delete to each song render
      <div className="Playlist">
        <div className="Playlist-header">
          {!this.state.playlistNameEdit
            ? <p>{this.state.playlistName} </p>
            : <form onSubmit={(evt) => this.handleSubmit(evt)}>
              <label htmlFor="editPlaylistName">Name: </label>
              <input id="editPlaylistName" type="text" value={this.state.playlistName} onChange={(evt) => this.handleChangeName(evt)} ></input>
              <button type="submit">Edit name</button>
            </form>
          }

          <div className="Playlist-header-buttons">
            <button onClick={() => {
              this.props.deletePlaylist(this.props.playlist._id)
            }
            }>Delete</button>
            <button onClick={() => this.handleEdit()}>Edit</button>
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
              this.state.songs.map((songs, i) => {
                return (
                  <tr>
                    <td>{songs.name}</td>
                    <td>{songs.artist}</td>
                    <td className="Playlist-delete-song">X</td>
                  </tr>

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

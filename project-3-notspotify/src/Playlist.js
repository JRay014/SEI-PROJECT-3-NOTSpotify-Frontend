import React, { Component } from 'react'
import './Playlist.css'

class Playlist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songs: [],
    }
  }

  addSongs = () => {
    this.setState({
      songs: [...this.props.playlist.songs]
    })
  }
  componentDidMount() {
    this.addSongs()
  }

  render() {
    // console.log(this.state.songs)
    return (
      //Add Delete to each song render
      <div className="Playlist">
        <div className="Playlist-header">
          <p>{this.props.playlist.name} </p>
          <div className="Playlist-header-buttons">
            <button onClick={() => {
              this.props.deletePlaylist(this.props.playlist._id)
            }
            }>Delete</button>
            <button>Edit</button>
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

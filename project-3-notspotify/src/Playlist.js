import React, { Component } from 'react'

class Playlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            songs: [],
        }
    }

    addSongs = ()=>{
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
            <div>
                <ul>
                    <li>{this.props.playlist.name}</li>
                    <button onClick={()=>{
                        this.props.deletePlaylist(this.props.playlist._id)
                      }
                    }>Delete</button>
                    {
                      this.state.songs.map((songs,i)=>{
                      return(
                        <li key={i}>{songs}</li>
                      )}
                    )}
                </ul>
            </div>
        )
    }
}

export default Playlist

import React, { Component } from 'react'
import './AddSong.css'
const Musixmatch = require('musixmatch-node')
const mxm = new Musixmatch('54340e8a4266915b118c498fc98c1f6f')


let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3003'
} else {
    baseUrl = 'heroku url here'
}


class AddSong extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            artist: '',
            playlists: [],
            searchResult: []
        }
    }
    getPlaylist = async () => {
        const response = await fetch(baseUrl + "/notspotify")
        const parseData = await response.json()
        // console.log(parseData)
        this.setState({
            playlists: parseData,
            // currentUser: this.props.currentUser
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    componentDidMount() {
        this.getPlaylist()
    }

    getSongFromAPI = async (event) => {
        event.preventDefault()
        try {
            const track = await mxm.searchTrack({
                q_track: this.state.name,
                q_artist: this.state.artist,
            })
            console.log(track)
            this.setState({
                searchResult: track.message.body.track_list
            })
        } catch (err) {
            console.log(err)
        }
    }

    addSongHandle = (track, artist) => {
        const song = { name: track, artist: artist }
        this.props.addSong(song)
    }

    render() {
        // console.log(this.state.searchResult)

        return (
            <>
                <form className="AddSong" onSubmit={(evt) => this.getSongFromAPI(evt)}>
                    <h3>Track Search</h3>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" onChange={(evt) => this.handleChange(evt)} />
                    <br></br>
                    <label htmlFor="artist">Artist: </label>
                    <input type="text" id="artist" name="artist" onChange={(evt) => this.handleChange(evt)} />
                    <br></br>

                    <br></br>
                    <button type="submit">Search</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Artist</th>
                            <th>ADD</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.searchResult.map(song => {
                            return (
                                <tr>
                                    <td>{song.track.track_name}</td>
                                    <td>{song.track.artist_name}</td>
                                    <td><button onClick={() => this.addSongHandle(song.track.track_name, song.track.artist_name)}>Add</button></td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>


            </>
        )
    }
}

export default AddSong

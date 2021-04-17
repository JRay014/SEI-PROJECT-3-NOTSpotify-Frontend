import React, { Component } from 'react'
import './Song.css'


class Song extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     name: '',
        //     artist: '',
        //     album: '',
        //     year: '',
        //     genre: '',
        // }
    }
    render() {
        return (
            <tr className="Song">
                <td>{this.props.song.name}</td>
                <td>{this.props.song.artist}</td>
                <td onClick={() => this.props.deleteSong(this.props.song)} className="Song-delete">X</td>
            </tr>
        )
    }
}

export default Song
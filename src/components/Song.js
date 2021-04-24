import React, { Component } from 'react'
import './css/Song.css'


class Song extends Component {

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

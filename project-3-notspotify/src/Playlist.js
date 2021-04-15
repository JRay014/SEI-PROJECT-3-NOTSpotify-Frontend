import React, { Component } from 'react'

class Playlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            song: [],
        }
    }

    render() {
        return (
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
        )
    }
}

export default Playlist
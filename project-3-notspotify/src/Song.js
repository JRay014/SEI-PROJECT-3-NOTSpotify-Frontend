import React, { Component } from 'react'

class Song extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            artist: '',
            album: '',
            year: '',
            genre: '',
        }
    }
}
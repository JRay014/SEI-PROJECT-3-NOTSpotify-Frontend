import React, { Component } from 'react'
import "./NewPlaylistForm.css"


class NewPlaylist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    handleChangeName = (event) => {
        // console.log(event.target.value)
        this.setState({
            name: event.target.value,

        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(this.props.baseUrl + '/notspotify', {
                method: 'POST',
                body: JSON.stringify({ name: this.state.name }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const parsedResponse = await response.json()
            this.props.addPlaylist(parsedResponse)
            this.props.handleNewPlaylist()
            this.setState({
                name: '',

            })
        } catch (error) {
            console.log('Error: ', error)
        }

    }


    render() {
        return (
            <>
                <form className="NewPlaylistForm" onSubmit={(evt) => this.handleSubmit(evt)}>
                    <label htmlFor="name">Name: </label>
                    <input required="true" type="text" id="name" name="name" onChange={(evt) => this.handleChangeName(evt)} value={this.state.name} />
                    <br></br>
                    <button type="submit">Add Playlist</button>
                </form>
            </>
        )
    }
}

export default NewPlaylist
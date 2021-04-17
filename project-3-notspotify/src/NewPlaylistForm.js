import React, { Component } from 'react'


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
                <form onSubmit={(evt) => this.handleSubmit(evt)}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" onChange={(evt) => this.handleChangeName(evt)} value={this.state.name} />
                    <br></br>
                    <input type="submit" value="Add New Playlist" />
                </form>
            </>
        )
    }
}

export default NewPlaylist
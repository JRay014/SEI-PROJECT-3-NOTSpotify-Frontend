import React from 'react'

class Search extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        baseURL: '',
        apikey: `apikey=${process.env.REACT_APP_API_KEY}`,
        query: '',
        songs: [],
        searchURL: ''
      }
    }
  }


function SearchResults(props) {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor='movieTitle'>Title</label>
        <input
          id='movieTitle'
          type='text'
          value={this.state.movieTitle}
          onChange={this.handleChange}
        />
        <input
          type='submit'
          value='Find Movie Info'
        />
        </form>
        {(this.state.movie)
          ? <MovieInfo movie={this.state.movie} />
          : ''
        }
      </>
    )
  }
}
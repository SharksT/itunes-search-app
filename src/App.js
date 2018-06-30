import React from 'react'
import Search from './components/search'
import axios from 'axios'
import _ from 'lodash'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      query: '',
      direction: {
        collectionName: 'desc',
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.sortBy = this.sortBy.bind(this)
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    })
  }



  sortBy(key) {
    this.setState({
      data: this.state.data.sort( (a, b) => (
        this.state.direction[key] === 'asc'
          ? parseFloat(a[key]) - parseFloat(b[key])
          : parseFloat(b[key]) - parseFloat(a[key])
      )),
      direction: {
        [key]: this.state.direction[key] === 'asc'
          ? 'desc'
          : 'asc'
      }
    })
  }
  
  handleClick() {
   const search =  this.state.query.split(' ').join('+')
   const api = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?media=music&term="
   const to_fetch = api + search + "&limit=1&wrapperType=track&kind=song"
   axios(to_fetch)
    .then(response => {
      if (!response.data || !response.data.resultCount) return false;
      const artistId = response.data.results[0].artistId
      return axios(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${artistId}&entity=album`)
    })
    .then(response => {
      if (!response.data || (response.data.resultCount < 2)) return false;
      const data = response.data.results.slice(1)
      let tracks = []
      for (let i = 0; i < data.length; i++) {
        let album = data[i].collectionName
        const datatype = {}
        axios(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${data[i].collectionId}&entity=song`).then((response) => {
        tracks = tracks.concat(response.data.results)  
        //const trackAlbum = tracks[0].collectionName
          if(i === (data.length - 1)){
              console.log(_.groupBy(tracks,'collectionName'))
              this.setState({
                data : _.groupBy(tracks,'collectionName'),
                //data : tracks
              },this.sortBy('releaseDate'))    
          }
          /*this.setState({
            data: responses.results
          }),this.sortBy('collectionId')*/
        });
      }
    })
      
  }

  render() {
    return (
      <div>
        <Search
          search={this.state.data}
          value={this.state.query}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          sortBy={this.sortBy}
        />
      </div>
    )
  }
}

export default App

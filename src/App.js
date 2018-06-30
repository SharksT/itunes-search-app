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
    this.handleKey = this.handleKey.bind(this)
  }


  
  handleKey(e) {
      this.setState({
        query: e.target.value
      })
   const search =  this.state.query.split(' ').join('+')
   const api = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?media=music&term="
   const to_fetch = api + search + "&limit=1&wrapperType=track&kind=song"
   axios(to_fetch)
    .then(response => {
      if (!response.data || !response.data.resultCount) return false;
      const artistId = response.data.results[0].artistId
      const artistName = response.data.results[0].artistName;
      return axios(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${artistId}&entity=album`)
    })
    .then(response => {
      if (!response.data || (response.data.resultCount < 2)) return false;
      const data = response.data.results.slice(1)
      let tracks = []
      for (let i = 0; i < data.length; i++) {
        axios(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${data[i].collectionId}&entity=song`).then((response) => {
        tracks = tracks.concat(response.data.results)  
          if(i === (data.length - 1)){
              console.log(_.groupBy(tracks,'collectionName'))
              this.setState({
                data : _.groupBy(tracks,'collectionName'),
              })    
          }
        });
      }
    })
   
  }

  render() {
    return (
      <div>
        <Search
          search={this.state.data}
          handleKey={this.handleKey}
        />
      </div>
    )
  }
}

export default App

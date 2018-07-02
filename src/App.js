import React, { Component } from 'react';
import Header from './components/template/header'
import Search from './components/template/search'
import axios from 'axios'
import _ from 'lodash'

class App extends Component  {

  state = {
    data : [],
    artistName: '',
    query: ' ',
  }
  handleKey = this.handleKey.bind(this);

  handleKey(e)
  {
      this.setState({
        query: e.target.value
      })
      
  }
  shouldComponentUpdate(state,nextState)
  {
    return state.data !== nextState.data
  }
  handleEnter = (e) => {
  if ((e.key === 'Enter') | (e.keywich === 13) | (e.keyCode === 13)){ 
   const search =  this.state.query.split(' ').join('+')
   const api = "https://sheltered-caverns-93018.herokuapp.com/https://itunes.apple.com/search?media=music&term="
   const to_fetch = api + search + "&limit=1&wrapperType=track&kind=song"
   axios(to_fetch)
    .then(response => {
      if (!response.data || !response.data.resultCount) return false;
      const artistId = response.data.results[0].artistId
      this.setState({
        artistName: response.data.results[0].artistName.toUpperCase()
      })
      return axios(`https://sheltered-caverns-93018.herokuapp.com/https://itunes.apple.com/lookup?id=${artistId}&entity=album`)
    })
    .then(response => {
      if (!response.data || (response.data.resultCount < 2)) return false;
      const data = response.data.results.slice(1)
      let tracks = []
      for (let i = 0; i < data.length; i++) {
        axios(`https://sheltered-caverns-93018.herokuapp.com/https://itunes.apple.com/lookup?id=${data[i].collectionId}&entity=song`).then((response) => {
        tracks = tracks.concat(response.data.results)  
          if(i === (data.length - 1)){
            const newdata = data
              this.setState(state =>{
                if(state.data === newdata){
                  return null;
                } else{
                  return {
                    data : _.groupBy(tracks,'collectionName'),
                  }
                }
              })    
          }
        });
      }
    })}
   
  }
  render() {
    return (
      <div>
        <Header 
        artistName = {this.state.artistName}
        handleKey={this.handleKey}
        handleEnter={this.handleEnter}
        />
        <Search
          search={this.state.data}
        />
      </div>
    )
  }
}

export default App

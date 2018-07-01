import React from 'react'
import '../css/main.css';


export default function Search(props) {
  const millisToMinutesAndSeconds= (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  const gettime = (row) =>{
    return millisToMinutesAndSeconds(row.trackTimeMillis);
  }

  const getYear = (row) =>{
    const str = row.releaseDate
    return str.slice(0,4)
  }
  const getThumbnail = (row) => {
    const noImage =<b>Thumbnail Unavailable</b>;
    const image = <img className='imga'src={row.artworkUrl100.replace('100x100', '150x150')} alt={row.collectionName}/>;
    return image || noImage;
  }
  let myData = props.search || {}
  return (
  <div className='container'>
        {    
            Object.keys(myData).sort(function(a,b){return getYear(myData[b][0]) - getYear(myData[a][0]) }).map(key => {
              return (
                  <div className='item' >
                      {getThumbnail(myData[key][0])}
                      <div className='v'>
                      </div>
                      <div className='info'>
                      <p className='date'>{getYear(myData[key][0])}</p>
                      <h1>{key}</h1>
                      <ul>
                          { myData[key].reduce((acc, track, index) => { 
                      if(track.trackCensoredName != null) { 
                          acc.push(
                          <li className="tracks"><p className="dist">{track.trackCensoredName}</p><p className='dur'>{gettime(track)}</p></li>)
                      }
                      return acc;
                  }, []) }
                      </ul>
                      </div>
                  </div>
              )
          })
        }
     
  </div>
  )
}
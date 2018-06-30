import React from 'react'
import '../css/main.css';
//import Bell from 'react-svg-loader!../media/bell-regular.svg';
import  Bell from '../media/bell-regular.svg';


export default function Search(props) {

  const millisToMinutesAndSeconds= (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  const gettime = (row) =>{
    return millisToMinutesAndSeconds(row.trackTimeMillis);
  }


  const getThumbnail = (row) => {
    const noImage = <b>Thumbnail Unavailable</b>;
    const image = <img className = 'imga'src={row.artworkUrl100.replace('100x100', '150x150')} alt={row.collectionName}/>;
    return image || noImage;
  }
  let myData = props.search || {}
  return (
  <div className='container'>
    <div className="header">
      <div className= "header top">
      <Bell />
      </div>
      <div className = "header mid">
      <input
        type="text"
        onChange={props.handleChange}
        value={props.value}
      />
      <button 
        onClick={props.handleClick}
      >Pesquisar</button>
      </div>
    </div>
        {    
            Object.keys(myData).map(key => {
              return (
                  <div className='item' >
                      {getThumbnail(myData[key][0])}
                      <p>{myData[key][0].releaseDate}</p>
                      <h1>{key}</h1>
                      <ul>
                          { myData[key].reduce((acc, track, index) => { 
                      if(index > 0) { 
                          acc.push(
                          <li><hr/><p className="dist">{track.trackCensoredName}</p><p className='dur'>{gettime(track)}</p></li>)
                      }
                      return acc;
                  }, []) }
                      </ul>
                  </div>
              )
          })
        }  
  </div>
  )
}
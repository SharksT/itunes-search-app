import React from 'react'
import '../../css/main.css';
import bell from '../../media/bell-regular.svg'
import profile from '../../media/user-circle-regular.svg'
import message from '../../media/comments-regular.svg'
import contact from '../../media/contact.jpg'
import arrow from '../../media/sort-down-solid.svg'
import singer from '../../media/singer.jpg'


export default function Header(props){
    return(
        <div className="header">
        <div className="top">
          <div className="side">
          <input
          type="text"
          onKeyPress={props.handleKey}
          placeholder="Search.."
           />
          </div>
          <div className="icons">
          <img src={profile} className='imgh' alt="profile" />
          <img src={message} className='imgh' alt="messages" />
          <img src={bell} className='imgN' alt="notification" />
          <img src={contact} className='imgc' alt="contact" />
          <img src={arrow} className='arrow' alt='info' />
          <p className='contactName'>HOANG NGUYEN</p>
          </div>
        </div>
    { (props.artistName != '') ? 
        <div className="mid">
          <div className="artist">
          <img src={singer} className="imgSinger"/>
          <h2 className="artistName">{props.artistName}</h2>
          </div>
          <div className="menu">
          <ul className="subMenu">
            <li className="activeMenu"><a href="#A"> ALBUNS </a></li>
            <img src ={arrow}className="albumTick"/>
            <li className="menuItem"><a href="#B"> ARTISTAS </a></li>
            <li className="menuItem"><a href="#C"> PLAYLISTS </a></li>
          </ul>
          </div>
        </div>
      :null} </div>
    )
}
import React from 'react';
import { Link } from 'react-router-dom';
import User from '../User';
import axios from 'axios';
import stocklogo from '../images/stocklogo.png';

function onclick(event) {
  console.log('onclick');
  window.location.href = '/login';
}

const Header = props => {
  return (
    <header>
      <Link to='/'>
      <img class="logo" src={stocklogo} alt="Stock Scraper Loop"/>
      </Link>
      {/* <Link to='/login'>
        <h2>Login</h2>
      </Link> */}
      <button onClick={onclick}>Login</button>
     
   </header>
  )
}


export default Header
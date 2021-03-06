import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import stocklogo from '../images/stocklogo.png';

function onLogin(event) {
  console.log('onLogin');
  window.location.href = 'https://stockappbackend.herokuapp.com/login';
}

function onLogout(event) {
  console.log('onLogout');
  window.location.href = 'https://stockappbackend.herokuapp.com/logout';
}

class Header extends Component {
  state = { userName: '' }

  componentDidMount() {
    axios.get('https://stockappbackend.herokuapp.com/api/user_name', {withCredentials: true}).then((res)=>{
      console.log(res);
      this.setState({ userName: res.data });
    });
  }
  render() {
    var button = <button onClick={onLogin}>Login</button>;
    if(this.state.userName != '')
      button = <button onClick={onLogout}>Logout</button>;
    return (
      <header>
        <Link to='/'>
        <img class="logo" src={stocklogo} alt="Stock Scraper Loop"/>
        </Link>
        <h2>{this.state.userName}</h2>
        {/* <Link to='/login'>
          <h2>Login</h2>
        </Link> */}
        {button}
       
     </header>
    )
  }
}


export default Header
import React from 'react';
import moment from 'moment';
import DerekEricson from '../images/DerekEricson.png';

const Footer = () => {
  return (
    <footer>
      <h6 className="text-sm-center"><i className="fa fa-code"></i> <img class="myname" src={DerekEricson} alt="Derekson"/> {moment().format('YYYY')}</h6>
      <p className="text-sm-center">
        <a className="social-link" href="https://github.com/dericson87" target="_blank" rel="noopener noreferrer"><i className="fa fa-2x fa-github"></i></a>
        <a className="social-link" href="https://www.linkedin.com/in/derek-ericson-30306915/" target="_blank" rel="noopener noreferrer"><i className="fa fa-2x fa-linkedin"></i></a>
      </p>
    </footer>
  )
}

export default Footer
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';


var root = document.getElementById('root');
if(root){
  ReactDOM.render(
              <BrowserRouter>
                <App/>
              </BrowserRouter >
            ,
            root
          );

  registerServiceWorker();
}
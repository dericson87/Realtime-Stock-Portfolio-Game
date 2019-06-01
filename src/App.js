import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StockList from './components/stocks/StockList';
import StockInfo from './components/stocks/info/StockInfo';



class App extends Component {

    state = {
      // stocks: ['NFLX', 'TSLA', 'MSFT', 'AMZN', 'AAPL'],
      stocks: ['TSLA', null, null, null, null],
      stocksData: {},
      user: null
    }

  componentWillMount() {
  }

  componentDidMount() {
    axios.get('https://stockappbackend.herokuapp.com/api/user_stocks', {withCredentials: true}).then((res)=>{
      console.log(res);
      this.setState({ stocks: res.data });
    });
    this.fetchStocksData(); // fetch stock data on mount
    //setInterval(this.fetchStocksData, 2000); // fetch data every 2 seconds
  }

  fetchStocksData = async () => {
    const { stocks } = this.state

    const resp = await axios.post('https://stockappbackend.herokuapp.com/api/get-stocks', { stocks: stocks }, {withCredentials: true});

    this.setState({
      stocksData: resp.data
    })
  }

  updateStocks = (idx, symbol) => {
    let updatedStocks = [...this.state.stocks];
    updatedStocks[idx] = symbol;

    console.log('>>> updated stocks: ' + updatedStocks);
    this.setState({
      stocks: updatedStocks,
    });

    axios.post('https://stockappbackend.herokuapp.com/api/set-stocks', { stocks: updatedStocks }, {withCredentials: true});
    this.fetchStocksData();
  };

  render() {

    const { stocks, stocksData } = this.state;

    return (
      <div className="App">
       <Header />
       {/* <Chart /> */}
        <main>
          <Switch>
            <Route exact path='/' 
              render={ () => (
                <StockList 
                  stocks={stocks} 
                  stocksData={stocksData}
                  updateStocks={this.updateStocks}
                />
              )}
            />

            <Route exact path='/stock/:symbol' 
              render={ props => (
                <StockInfo 
                  symbol={props.match.params.symbol} 
                  stockData={stocksData[props.match.params.symbol]}
                />
              )}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App
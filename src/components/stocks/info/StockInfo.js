import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import History from '../details/History';
import NewsFeed from '../details/NewsFeed';
import homebutton from '../../../images/homebutton.png';
import marketnews from '../../../images/marketnews.png';
import fivedaypath from '../../../images/fivedaypath.png';
import buybutton from '../../../images/buybutton.jpg';
import sellbutton from '../../../images/sellbutton.jpg';
class StockInfo extends Component {

  fetchHistory = () => {
    const { stockData } = this.props

    if (stockData) {
      return stockData.chart.slice(-5).reverse().map( (data, idx) => {
        return <History 
                  key={idx} 
                  data={data} 
                />
      })
    }

  }

  fetchNewsFeed = () => {
    const { stockData } = this.props
    if (stockData) {
      return stockData.news.map( (article, idx) => {
        return <NewsFeed 
                  key={idx} 
                  article={article} 
                />
      })
    }
  }

  render() {
    const { symbol, stockData } = this.props;

    if (stockData) {
      var { companyName, latestPrice, change, changePercent } = stockData.quote;
      var { logo } = stockData;
    }

    return(
      <div className='stock-details'>
        <div className='stock-header'>
          {stockData && <div className='stock-logo' style={{backgroundImage: `url(${logo.url})`}}></div>}

          <h1 className='stock-symbol'>{symbol}</h1> 

          {stockData && <i className='stock-company-name'>({companyName})</i>}

          {stockData && 
            <div className='current'>
              <h3>${latestPrice.toFixed(2)}</h3>

              <p style={{color: change === 0 ? 'green' : change > 0 ? 'green' : 'red'}}>
                <span>{change.toFixed(2)} </span>
                <span>
                  {change > 0 ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                  {(Math.abs(changePercent) * 100).toFixed(2)}%
                </span>
              </p>
             
            </div>}
        </div>

        {stockData ? 
        <div className='stock-details-data'>
           <img class="fivedaypath" src={fivedaypath} alt="5 Day Price Movement"/>
          <div className='history'>
         
          
            {this.fetchHistory()}
          </div>

          
          <img class="marketnews" src={marketnews} alt="News Feed"/>
            {this.fetchNewsFeed()}
         
        </div>
        :
        <div className='stock-info-data'>
          <h3>Loading...</h3>
        </div>
        }

        <Link to='/'>
          
            <img class="homebutton" src={homebutton} alt="Home Page"/>
          
        </Link>
      </div>
    )
  }
}



export default StockInfo
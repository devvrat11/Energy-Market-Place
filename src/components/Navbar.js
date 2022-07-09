import React, { Component } from 'react';
// import './App.css';
// import Web3 from 'web3'
// import Marketplace from '../abis/Marketplace.json'

class App extends Component {
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
            href=""
          > 
            Energy Marketplace
           </a>
           <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>        </nav>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Energy Marketplace </h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

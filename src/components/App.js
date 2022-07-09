import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Navbar from "./Navbar";
import Main from "./Main";
// import { PropTypes } from 'react'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts)
    this.setState({ account: accounts[0] }); // this ensures connection eith metamask

    // getting data form marketplace .json
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    // const abi = Marketplace.abi;
    // console.log(networkId);
    // console.log(networkData.address);
    // console.log(abi);

    if (networkData) {
      // to make sure we are connected to ganache and not any other testnet or mainnet
      const marketplace = await new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      // console.log(Marketplace.abi)
      // console.log(networkData.address)
      // console.log(marketplace)
      this.setState({ marketplace });
      // const productCount = await marketplace.methods.productCount().call();
      const productCount = await marketplace.methods.getProductCount().call();
      // console.log(productCount.toString());
      this.setState({ productCount });
      // console.log(productCount.toString());
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        console.log(product);
        this.setState({
          products: [...this.state.products, product],
        });
      }

      this.setState({ loading: false });
    } else
      window.alert(
        "marketplace contract not deployed to the connected network"
      );
  }

  createProduct(name, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createProduct(name, price)
      .send({
        from: this.state.account,
      })
      .once("receipt", (receipt) => {
        console.log(receipt);
        this.setState({ loading: false });
      });
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      products: [],
      loading: true,
    };
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this)

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  render() {
    return (
      <>
        {/* <Navbar account={this.state.account}/>
        <Main createProduct = {this.createProduct}/> */}
        <div>
          <Navbar account={this.state.account} />
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex">
                {this.state.loading ? (
                  <div id="loader" className="text-center">
                    <p className="text-center">Loading...</p>
                  </div>
                ) : (
                  <Main
                    products={this.state.products}
                    createProduct={this.createProduct}
                    purchaseProduct={this.purchaseProduct}
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;

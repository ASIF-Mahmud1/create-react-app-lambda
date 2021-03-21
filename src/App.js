import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import {getIBMToken } from './utils/ibm-auth'
import {predictEmailTag} from './utils/ibm-predict-api'

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }


  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }
  handlePrediction= async()=>{
    const response= await getIBMToken("d")
    console.log("Token  ", response)

    const result= await predictEmailTag(response.access_token)
    console.log("result ", result)
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <button onClick={()=>{this.handlePrediction()}}>Test This</button>
        <small>You are running this application in <b>{process.env.REACT_APP_IBM_ApiKey}</b> mode.</small>
        <span>{msg}</span>
      </p>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App

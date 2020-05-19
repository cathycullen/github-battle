import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'

// need to install the following:
// npm install --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader html-webpack-plugin


// Component
// State
// Lifecycle
// UI

// define  a conponent
class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className = 'container'>
        <Battle />
      </div>
    )
  }
}

// use the component
ReactDom.render(
  // React Element
  // Where to render
  <App/>,
  document.getElementById('app')
)

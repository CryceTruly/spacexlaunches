import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import './App.css';
import download from './download.png';
import Launches from './components/Launches';
import Launch from './components/Launch';
import {BrowserRouter as Router,Route} from 'react-router-dom';


const client=new ApolloClient({
  uri:"http://localhost:5000/graphql"
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>


      <Router>
 < div className = "container App" >
          <img src = {
            download
          }
        alt = "spacex"
        style = {
          {
            width: 300,
            display: 'block',
            margin: 'auto'
          }
        }
        />
<Route exact path="/" component={Launches}></Route>
<Route exact path="/launch/:flight_number" component={Launch}></Route>
        </div>

      </Router>

      </ApolloProvider>
    );
  }
}

export default App;

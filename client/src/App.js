import React,{Component} from 'react';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import ProfileList from './components/ProfileList';
import {BrowserRouter as Router,Route} from 'react-router-dom';

export default class App extends Component {
  render(){
    return(
  <Router>
    <div>
      <Navbar/>
      <Route path="/" exact component={Welcome}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/profiles" component={ProfileList}/>

    </div>
  </Router>
    );
  }
}

import React,{Component} from 'react';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import ProfileList from './components/ProfileList';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import {BrowserRouter as Router,Route} from 'react-router-dom';

export default class App extends Component {
  render(){
    return(
  <Router>
    <div>
      <Route path="/" exact component={Welcome}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/profiles" component={ProfileList}/>
      <Route path="/create" component={Profile}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/upload" component={Upload}/>

    </div>
  </Router>
    );
  }
}

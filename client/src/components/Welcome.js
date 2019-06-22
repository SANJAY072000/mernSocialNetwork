import React,{Component} from 'react';
import Navbar from './Navbar';
import Landing from './Landing';
import Dashboard from './Dashboard';
import {Link} from 'react-router-dom';

export default class Welcome extends Component {
  render(){
    return(
      <div>
      {localStorage.getItem('usertoken')?<Dashboard/>:<Landing/>}
      </div>
    );
  }
}

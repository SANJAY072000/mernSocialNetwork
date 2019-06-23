import React,{Component} from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';

export default class Welcome extends Component {
  render(){
    return(
      <div>
      {localStorage.getItem('usertoken')?<Dashboard/>:<Landing/>}
      </div>
    );
  }
}

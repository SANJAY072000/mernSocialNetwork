import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Welcome extends Component {
  render(){
    return(
      <div className="lp vh-100">
      <div className="container mt-5 pt-5">
      <h1 className="text-center text-light display-5 mt-5 pt-5 animated rubberBand">Welcome to Developers Network</h1>
      <p className="text-center text-light mt-5 mb-5">Create a developer profile and join the network to get help from other developers</p>
      <div className="d-flex justify-content-center align-items-start">
      <Link to="/register" className="btn btn-primary"><i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up</Link>
      <Link to="/login" className="btn btn-success ml-3"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</Link>
      </div>
      </div>
      </div>
    );
  }
}

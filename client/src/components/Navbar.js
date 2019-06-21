import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render(){
    return(
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-info">
<Link to="/" className="navbar-brand">DevNetwork</Link>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav mr-auto">
  <li className="nav-item active ml-3">
  <Link to="/profiles" className="nav-link">Developers</Link>
  </li>
</ul>
  <ul className="navbar-nav ml-auto">
    <li className="nav-item active">
    <Link to="/register" className="nav-link">Sign Up</Link>
    </li>
    <li className="nav-item active">
    <Link to="/login" className="nav-link">Login</Link>
    </li>
  </ul>
</div>
</nav>
      </div>
    );
  }
}

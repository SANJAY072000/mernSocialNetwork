import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
     redirect:false
    };
  }
  renderRedirect(){
    if (this.state.redirect) {
    return <Redirect to='/' />
    }
  }
  setRedirect(){
    this.setState({
      redirect: true
    });
    this.renderRedirect();
  }
  onClick(){
    localStorage.removeItem('usertoken');
    this.setRedirect();
  }
  render(){
    const loginLink=(
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
        <Link to="/register" className="nav-link">Sign Up</Link>
        </li>
        <li className="nav-item active">
        <Link to="/login" className="nav-link">Login</Link>
        </li>
        </ul>),
        userLink=(<ul className="navbar-nav ml-auto">
     <li className="nav-item active">
     <Link to="/profiles" className="nav-link">Posts</Link>
     </li>
  <li className="nav-item active">
  <button className="nav-link btn btn-link" onClick={this.onClick.bind(this)}>Logout</button>
  </li>
  </ul>);
    return(
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-info">
<Link to='/' className="navbar-brand">DevNetwork</Link>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav mr-auto">
  <li className="nav-item active ml-3">
  <Link to="/profiles" className="nav-link">Developers</Link>
  </li>
</ul>
  {localStorage.getItem('usertoken')?userLink:loginLink}
</div>
</nav>
      </div>
    );
  }
}

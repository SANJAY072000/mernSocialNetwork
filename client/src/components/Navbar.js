import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {
  componentDidMount(){
    axios({
      url:'/api/profile/dashboard',
      headers:{
        Authorization:localStorage.getItem('usertoken')
      }
    })
    .then(res=>{
      if(res.data.profilenotfound==='No Profile yet')
      this.setState({isProfile:true});
     else if(res.data.pic!=='images/upload/man.png')
      this.setState({url:res.data.pic,
      id:res.data._id});
      else this.setState({id:res.data._id});
    })
    .catch(err=>console.log(err));
  }
  componentDidUpdate(){
    axios({
      url:'/api/profile/dashboard',
      headers:{
        Authorization:localStorage.getItem('usertoken')
      }
    })
    .then(res=>{
      if(res.data.profilenotfound==='No Profile yet')
      this.setState({isProfile:true});
     else if(res.data.pic!=='images/upload/man.png')
      this.setState({url:res.data.pic,id:res.data._id});
      else this.setState({id:res.data._id});
    })
    .catch(err=>console.log(err));
  }
  constructor(props){
    super(props);
    this.state = {
     redirect:false,
     url:'images/upload/man.png',
     isProfile:false,
     id:''
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
        userLink=(<ul className="navbar-nav">
        <li className="nav-item active mt-2">
        <Link to="/dashboard" className="nav-link">
        <img className="navbar-brand rounded-circle" src={this.state.url} alt="Unavailable" width="40" height="40"
        style={{"height":"40px","width":"40px"}}/>
        {this.state.isProfile?'':'Dashboard'}
        </Link>
        </li>
     <li className="nav-item active"  style={{"marginTop":"6px"}}>
     <Link to={this.state.isProfile?'/create':`/posts-${this.state.id}`} className="nav-link mt-2">{this.state.isProfile?'Create':'Posts'}
     </Link>
     </li>
  <li className="nav-item active" style={{"marginTop":"14px"}}>
  <Link to="/login" className="nav-link" onClick={this.onClick.bind(this)}>
  Logout
  </Link>
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

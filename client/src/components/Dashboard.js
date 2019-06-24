import React,{Component} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class Dashboard extends Component {
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
      else
      this.setState({profile:res.data});
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
      else
      this.setState({exp:res.data.experience,
      edu:res.data.education,
    profile:res.data});
    })
    .catch(err=>console.log(err));
  }
  constructor(props){
    super(props);
    this.state = {
      profile:{experience:[],education:[]},
      isProfile:false
    };
  }
  render(){
    return(
      <div>
      <Navbar/>
      {this.state.isProfile?<Cfirst/>:<Hashboard profile={this.state.profile}/>}
      </div>
    );
  }
}


class Hashboard extends Component{
  render(){
    return (
      <div>
      <div className="container" id="hash">
      <h1 className="display-3 mt-5 dash">Dashboard</h1>
      <h3 className="mt-2 ml-1 text-muted">Welcome
      <span className="ml-3 usn font-weight-bold">{this.props.profile.username}
      </span>
      </h3>
      <Link to="/edit-credentials">
      <button type="button" className="ml-1 mt-3 btn btn-outline-info">
      <i className="fa fa-user-plus" aria-hidden="true"></i> Edit Credentials
      </button>
      </Link>
      <div className="mt-4 mb-5">
      <Link to="/edit-profile">
      <button type="button" className="ml-1 btn btn-outline-primary"><i className="fa fa-user" aria-hidden="true"></i> Edit Profile</button>
      </Link>
      <Link to="/add-experience">
      <button type="button" className="ml-3 btn btn-outline-success"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Experience</button>
      </Link>
      <Link to="/add-education">
      <button type="button" className="ml-3 btn btn-outline-warning"><i className="fa fa-graduation-cap" aria-hidden="true"></i> Add Education</button>
      </Link>
    </div>
    <hr/>
    <div className="mt-5 ml-1">
    <h2 className="display-5 ed font-weight-bold">Experience Details 
    <i className="fa fa-plus-circle ml-2" aria-hidden="true"></i></h2>
      <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">Company</th>
        <th scope="col">Title</th>
        <th scope="col">Years</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {this.props.profile.experience.map((a,i)=><Exp ep={a} key={i}/>)}
    </tbody>
  </table>
    </div>
    <br/>
    <br/>
    <div className="mt-5 ml-1">
    <h2 className="display-5 ed font-weight-bold">Education Details 
    <i className="fa ml-2 fa-graduation-cap ml-2" aria-hidden="true"></i></h2>
      <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">Institution</th>
        <th scope="col">Degree</th>
        <th scope="col">Years</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
    {this.props.profile.education.map((a,i)=><Edu ed={a} key={i}/>)}
    </tbody>
  </table>
    </div>
    <button className="btn btn-outline-danger my-5 ml-1">Delete My Account</button>
      </div>
      </div>
    );
  }
}

class Exp extends Component {
  render(){
    return(
    <tr>
      <td>
        {this.props.ep.company}
      </td>
      <td>
        {this.props.ep.jobTitle}
      </td>
      <td>
        {this.props.ep.from} - {this.props.ep.isWorking?'Currently Working':this.props.ep.to}
      </td>
      <td>
      <Link to={`/del-${this.props.ep._id}`}>
      <button className="btn btn-danger btn-sm mb-1">Delete</button>
      </Link>
      </td>
    </tr>
    );
  }
}

class Edu extends Component {
  render(){
    return(
    <tr>
      <td>
        {this.props.ed.institution}
      </td>
      <td>
        {this.props.ed.degree}
      </td>
      <td>
        {this.props.ed.from} - {this.props.ed.isWorking?'Currently Studying':this.props.ed.to}
      </td>
      <td>
      <Link to={`/del-${this.props.ed._id}`}>
      <button className="btn btn-danger btn-sm mb-1">Delete</button>
      </Link>
      </td>
    </tr>
    );
  }
}

class Cfirst extends Component {
  render(){
    return(
      <div id="rgt">
        <div className="d-flex justify-content-center align-items-center vh-100">
        <h1 className="dispay-3 animated infinite bounce text-center">Create profile first !</h1>
        </div>
      </div>
    );
  }
}

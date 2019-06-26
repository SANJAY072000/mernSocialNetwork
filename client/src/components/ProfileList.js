import React,{Component} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class ProfileList extends Component {
  componentDidMount(){
    axios({
      url:'/api/profile/all'
    })
    .then(res=>{
      if(res.data)
      this.setState({profiles:res.data});
    })
    .catch(err=>console.log(err));
  }
  componentDidUpdate(){
    axios({
      url:'/api/profile/all'
    })
    .then(res=>{
      if(res.data)
      this.setState({profiles:res.data});
    })
    .catch(err=>console.log(err));
  }
  constructor(props){
    super(props);
    this.state = {
    profiles:[]
    };
  }
  render(){
    return(
      <div id="rgt">
      <Navbar/>
      <div className="d-flex justify-content-center align-item-center mt-5">
        <img className="" src="./images/favicon.jpg" alt="Unavailable"/>
        </div>
        <h1 className="display-4 text-center mt-3">Developer Profiles</h1>
        <p className="text-center mt-4">Browse and connect with developers</p>
        <div id="pl" className="mt-5 w-100">
         {this.state.profiles.map((a,i)=><List key={i} profiles={a}/>)}
        </div>
      </div>
    );
  }
}

class List extends Component{
  render(){
    return(
      <div className="row pl mt-5 py-4 px-2 w-100 border-top border-bottom border-dark">
        <div className="col-6">
        <img className="rounded-circle ml-4 img-fluid" alt="Unavailable" 
        src={this.props.profiles.pic} style={{"width":"200px","height":"200px"}}/>
        </div>
        <div className="col-6">
        <h3 className="mt-3">{this.props.profiles.user.name}</h3>
        <p className="text-muted">{this.props.profiles.domain}</p>
        <Link to={`/profile-${this.props.profiles.username}`} className="btn btn-primary btn-sm mt-2" 
        style={{"marginTop":"-5px"}}>
        <i className="fa fa-user" aria-hidden="true"></i> View Profile</Link>
        </div>
        <div className="col-6">
        <h3 className="my-4 text-center">Profession</h3>
        <p className="bg-light p-3 mx-auto border w-50"><i className="fa fa-check" aria-hidden="true"></i> {this.props.profiles.domain}</p>
        </div>
        </div>
    );
  }
}













import React,{Component} from 'react';
import Navbar from './Navbar';
import axios from 'axios';


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
  constructor(props){
    super(props);
    this.state = {
      profile:{},
      isProfile:false
    };
  }
  render(){
    return(
      <div>
      <Navbar/>
      {this.state.isProfile?<div className="d-flex justify-content-center align-items-center vh-100">
      <h1 className="dispay-4 text-center">Create profile first !</h1>
      </div>:<Hashboard/>}
      </div>
    );
  }
}


class Hashboard extends Component{
  render(){
    return (
      <div>
      Welcome to hashboard component.
      </div>
    );
  }
}








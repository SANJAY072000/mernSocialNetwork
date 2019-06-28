import React,{Component} from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';

export default class DevProfile extends Component{
  componentDidMount(){
    axios({
      url:`/api/profile/usf-${this.props.match.params.username}`
    })
    .then(res=>{
      this.setState({profile:res.data});
    })
    .catch(err=>console.log(err));
  }
  componentDidUpdate(){
    axios({
      url:`/api/profile/usf-${this.props.match.params.username}`
    })
    .then(res=>{
      this.setState({profile:res.data});
    })
    .catch(err=>console.log(err));
  }
  constructor(props){
    super(props);
    this.state = {
    profile:{experience:[],education:[],user:{},skills:[]}
    };
  }
    render(){
      return(
        <div id="rgt">
      <Navbar/>
       <Pl profile={this.state.profile}/>
</div>
      );
    }
  }

class Pl extends Component{
    render(){
      return(
          <div>
        <div className="d-flex justify-content-center align-item-center mt-5">
        <img className="img-fluid mt-4 rounded-circle" 
        src={`${this.props.profile.pic}`} alt="Unavailable" 
        style={{"width":"250px","height":"250px"}}/>
        </div>
        <h1 className="display-4 text-center mt-3">
        {this.props.profile.user.name}</h1>
        <p className="text-center mt-3">{this.props.profile.domain}</p>
        <p className="text-center border-bottom border-dark pb-4">{this.props.profile.address}</p>
        <div className=
        {localStorage.getItem('usertoken')?'d-flex justify-content-center':'d-none'}>
        <Link to={`/posts-${this.props.profile._id}`} className="btn btn-outline-warning btn-block mr-3">
        <i className="fa fa-telegram" aria-hidden="true"></i>  View Posts
        </Link>
        <Link to={`/messages-${this.props.profile._id}`} className="btn btn-outline-danger btn-block">
        <i className="fa fa-envelope-open-o" aria-hidden="true"></i>  Send Messages
        </Link>
        </div>
        <br/>
        <h4 className="text-center text-info">
        {this.props.profile.user.name}'s Bio</h4>
        <p className="lead mt-4 ml-4">{this.props.profile.about}</p>
        <h4 className="text-center mt-3 text-info mt-4">Skills Set</h4>
      {this.props.profile.skills.map((a,i)=>
       <p className="lead mt-4 ml-4 text-center" key={i}>
       <i className="fa fa-check" aria-hidden="true"></i> {a}</p>)}
        <h4 className="text-center text-info">Github Profile</h4>
        <p className="lead mt-4 ml-4 pb-5 text-center border-bottom border-dark">{this.props.profile.projects}</p>
        <div className="container">
        <div className="row mt-5">
        <div className="col-6">
        <h4 className="text-info">Experience</h4>
        <div className="card mt-5" 
        style={{"width":"18rem","marginLeft":"-50px"}}>
 {this.props.profile.experience.map((a,i)=><Ex key={i} exp={a}/>)}
</div>
</div>
        <div className="col-6 border-left border-dark">
        <h4 className="text-info text-center">Education</h4>
        <div className="card mt-5" 
        style={{"width":"18rem"}}>
        {this.props.profile.education.map((a,i)=><Ep key={i} epp={a}/>)}
</div>
</div>
</div>
</div>
</div>
      );
      }
    }

class Ex extends Component{
    render(){
        return(
            <div className="card-body border border-success mb-3">
    <h5 className="card-title">{this.props.exp.company}</h5>
    <div className="card-text">
    <p className="text-muted">
    {this.props.exp.from}-{this.props.exp.isWorking?'Current Job':this.props.exp.to}</p>
    <p className="">Position : 
    <span className="text-muted"> {this.props.exp.jobTitle}</span>
    </p>
    <p className="">Location : 
    <span className="text-muted"> {this.props.exp.location}</span>
    </p>
    </div>
  </div>
        );
    }
}

class Ep extends Component{
    render(){
        return(
    <div className="card-body border border-success mb-3">
    <h5 className="card-title">{this.props.epp.institution}</h5>
    <div className="card-text">
    <p className="text-muted">
    {this.props.epp.from}-{this.props.epp.isWorking?'Currently Studying':this.props.epp.to}</p>
    <p className="">Degree : 
    <span className="text-muted"> {this.props.epp.degree}</span>
    </p>
    <p className="">Field of Study : 
    <span className="text-muted"> {this.props.epp.branch}</span>
    </p>
    </div>
  </div>
        );
    }
}
















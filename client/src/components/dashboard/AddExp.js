import React,{Component} from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

export default class AddExp extends Component {
  constructor(props){
    super(props);
    this.state = {
      company:'',
      jobTitle:'',
      location:'',
      desc:'',
      from:'',
      to:'',
      isWorking:false
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.onCheck=this.onCheck.bind(this);
  }
  onChange(e){
    if(e.target.name==='company'||e.target.name==='jobTitle'||e.target.name==='location')
    this.setState({[e.target.name]:e.target.value.toUpperCase()});
    else
    this.setState({[e.target.name]:e.target.value});
    }
    onCheck(e){
        let isWorking=!this.state.isWorking;
        this.setState({isWorking});
    }
  onSubmit(e){
  e.preventDefault();
    let exp={
      company:this.state.company,
      jobTitle:this.state.jobTitle,
      location:this.state.location,
      desc:this.state.desc,
      from:this.state.from,
      to:this.state.to,
      isWorking:this.state.isWorking
    };
    axios({
        url:'/api/profile/addexp',
        method:'post',
        data:exp,
        headers:{
            Authorization:localStorage.getItem('usertoken')
        }    
    })
         .then(res=>{
           this.setState({
            company:'',
            jobTitle:'',
            location:'',
            desc:'',
            from:'',
            to:'',
            isWorking:false
          });
           this.props.history.push('/dashboard');
         })
         .catch(err=>console.log(err));
         }

  render(){
    return(
      <div id="rgt">
      <Navbar/>
        <div className="d-flex justify-content-center align-item-center mt-5">
        <img className="" src="./images/favicon.jpg" alt="Unavailable"/>
        </div>
        <h1 className="display-4 text-center mt-3">Add Experience</h1>
        <p className="text-center mt-4">Add any job or position that you had in the past or current</p>
        <div className="container">
        <form className="p-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Company</label>
            <input type="text" className='form-control' aria-describedby="emailHelp" placeholder="Company name" name="company" value={this.state.company} onChange={this.onChange}/>
          </div>
  <div className="form-group">
    <label>JobTitle</label>
    <input type="text" className='form-control' aria-describedby="emailHelp" placeholder="Job Title" name="jobTitle" value={this.state.jobTitle} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>Location</label>
    <input type="text" className='form-control' placeholder="Company Location" name="location" value={this.state.location} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>From</label>
    <input type="date" className='form-control' placeholder="From" name="from" value={this.state.from} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>To</label>
    <input type="date" className='form-control' placeholder="To" 
     name="to" disabled={this.state.isWorking?true:false}
     value={this.state.to} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <input type="checkbox" className='form-control mt-1 d-inline'
    disabled={(this.state.to==='')?false:true} name="isWorking" 
    checked={this.state.isWorking} onChange={this.onCheck} 
    style={{"height":"20px","width":"15px"}}/>
    <label className="d-inline ml-2">Current Job</label>
  </div>
  <div className="form-group">
    <label>Job Description</label>
    <textarea className='form-control' name="desc" value={this.state.desc} onChange={this.onChange} style={{"fontSize":"1.2em","height":"200px"}}>
    </textarea>
  </div>
  <button type="submit" className="btn btn-outline-primary mb-5 btn-block"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Experience</button>
</form>
</div>
</div>
    );
  }
}

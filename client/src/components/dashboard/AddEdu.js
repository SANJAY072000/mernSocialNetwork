import React,{Component} from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

export default class AddEdu extends Component {
  constructor(props){
    super(props);
    this.state = {
      institution:'',
      degree:'',
      branch:'',
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
    if(e.target.name==='institution'||e.target.name==='degree'||e.target.name==='branch')
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
    let edu={
      institution:this.state.institution,
      degree:this.state.degree,
      branch:this.state.branch,
      desc:this.state.desc,
      from:this.state.from,
      to:this.state.to,
      isWorking:this.state.isWorking
    };
    axios({
        url:'/api/profile/addedu',
        method:'post',
        data:edu,
        headers:{
            Authorization:localStorage.getItem('usertoken')
        }    
    })
         .then(res=>{
           this.setState({
            institution:'',
            degree:'',
            branch:'',
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
        <h1 className="display-4 text-center mt-3">Add Education</h1>
        <p className="text-center mt-4">Add any course or bootcamp that you have attended or currently doing</p>
        <div className="container">
        <form className="p-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Institution</label>
            <input type="text" className='form-control' aria-describedby="emailHelp" placeholder="Institution name" name="institution" value={this.state.institution} 
            onChange={this.onChange}/>
          </div>
  <div className="form-group">
    <label>Degree</label>
    <input type="text" className='form-control' aria-describedby="emailHelp" placeholder="Degree" name="degree" value={this.state.degree} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>Branch</label>
    <input type="text" className='form-control' placeholder="Branch" name="branch" value={this.state.branch} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>From</label>
    <input type="date" className='form-control' placeholder="From" name="from" value={this.state.from} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>To</label>
    <input type="date" className='form-control' 
    placeholder="To" name="to" disabled={this.state.isWorking?true:false}
    value={this.state.to} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <input type="checkbox" className='form-control mt-1 d-inline' 
    name="isWorking" disabled={(this.state.to==='')?false:true}
    checked={this.state.isWorking} onChange={this.onCheck} 
    style={{"height":"20px","width":"15px"}}/>
    <label className="d-inline ml-2">Currently doing</label>
  </div>
  <div className="form-group">
    <label>Program Description</label>
    <textarea className='form-control' name="desc" value={this.state.desc} onChange={this.onChange} style={{"fontSize":"1.2em","height":"200px"}}>
    </textarea>
  </div>
  <button type="submit" className="btn btn-outline-primary mb-5 btn-block"><i className="fa fa-graduation-cap" aria-hidden="true"></i> Add Education</button>
</form>
</div>
</div>
    );
  }
}

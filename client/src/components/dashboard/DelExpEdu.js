import React,{Component} from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

export default class DelExpEdu extends Component {
    componentDidMount(){
        axios({
          url:`/api/profile/del-${this.props.match.params.expeduid}`,
          headers:{
            Authorization:localStorage.getItem('usertoken')
          }
        })
        .then(res=>{
            if(res.data.title==='Experience')
            this.setState({expedu:res.data.exp,
            isExp:true});
            else if(res.data.title==='Education')
            this.setState({expedu:res.data.edu});
        })
        .catch(err=>console.log(err));
      }
    constructor(props){
        super(props);
        this.state = {
          expedu:{},
          isExp:false
      };
      this.onSubmit=this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        if(this.state.isExp){
            axios({
                method:'delete',
                url:`/api/profile/delexp-${this.props.match.params.expeduid}`,
                headers:{
                    Authorization:localStorage.getItem('usertoken')
                }
            })
            .then(res=>{
                if(res.data.expdel==='Experience Deleted')
                this.props.history.push('/dashboard');
            })
            .catch(err=>console.log(err));
        }
        else{
            axios({
                method:'delete',
                url:`/api/profile/deledu-${this.props.match.params.expeduid}`,
                headers:{
                    Authorization:localStorage.getItem('usertoken')
                }
            })
            .then(res=>{
                if(res.data.edudel==='Education Deleted')
                this.props.history.push('/dashboard');
            })
            .catch(err=>console.log(err));
        }
    }
  render(){
    return(
      <div>
        <Navbar/>
        <div className="d-flex justify-content-center align-item-center mt-5">
        <img className="" src="./images/favicon.jpg" alt="Unavailable"/>
        </div>
        <h1 className="display-3 font-weight-bold text-center mt-3 text-danger">
        {this.state.isExp?'Experience':'Education'}
        </h1>
        <p className="text-center font-weight-bold mt-4 text-danger">Flagged to be deleted !</p>
        <div className="container">
        <form className="p-3 border border-danger" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>{this.state.isExp?'Company':'Institution'}</label>
            <input type="text" disabled className='form-control' aria-describedby="emailHelp" 
            value={this.state.isExp?this.state.expedu.company:this.state.expedu.institution} />
          </div>
  <div className="form-group">
  <label>{this.state.isExp?'JobTitle':'Degree'}</label>
    <input type="text" disabled className='form-control' aria-describedby="emailHelp" 
    value={this.state.isExp?this.state.expedu.jobTitle:this.state.expedu.degree} />
  </div>
  <div className="form-group">
  <label>{this.state.isExp?'Location':'Branch'}</label>
    <input type="text" disabled className='form-control'
    value={this.state.isExp?this.state.expedu.location:this.state.expedu.branch} />
  </div>
  <div className="form-group">
    <label>From</label>
    <input type="date" disabled className='form-control' 
    value={this.state.isExp?this.state.expedu.from:this.state.expedu.from} />
  </div>
  <div className="form-group">
    <label>To</label>
    <input type="date" disabled className='form-control'
    value={this.state.isExp?this.state.expedu.to:this.state.expedu.to} />
  </div>
  <div className="form-group">
    <input type="checkbox" disabled className='form-control mb-2' 
    checked={this.state.expedu.isWorking}
    style={{"height":"20px","marginLeft":"-225px"}}/>
  <label>{this.state.isExp?'Current Job':'Currently Doing'}</label>
  </div>
  <div className="form-group">
  <label>{this.state.isExp?'Job Description':'Program Description'}</label>
    <textarea disabled className='form-control' 
    value={this.state.expedu.desc} 
    style={{"fontSize":"1.2em","height":"200px"}}>
    </textarea>
  </div>
  <button type="submit" className="btn btn-outline-danger mb-5 btn-block">X {this.state.isExp?'Remove Experience':'Remove Education'}</button>
</form>
</div>
      </div>
    );
  }
}

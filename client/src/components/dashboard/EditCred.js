import React,{Component} from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

export default class EditCred extends Component {
  componentDidMount(){
    setInterval(()=>
      this.setState({nameEmpty:false,
      emailEmpty:false,
      passwordEmpty:false,
      cpEmpty:false,
      passLength:false,
      cpCheck:false,
      isSent:false
    }),7000);
  }
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      password:'',
      cp:'',
      nameEmpty:false,
      emailEmpty:false,
      passwordEmpty:false,
      cpEmpty:false,
      passLength:false,
      cpCheck:false,
      isSent:false
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  onChange(e){
    if(e.target.name==='name')
    this.setState({[e.target.name]:e.target.value.toUpperCase()});
    else
    this.setState({[e.target.name]:e.target.value});
    }
  onSubmit(e){
  e.preventDefault();
  if(!(this.state.name && this.state.email && this.state.password && 
    this.state.cp)){
      if(this.state.name==='')
      this.setState({nameEmpty:true});
      if(this.state.email==='')
      this.setState({emailEmpty:true});
      if(this.state.password==='')
      this.setState({passwordEmpty:true});
      if(this.state.cp==='')
      this.setState({cpEmpty:true});
    }
    else{
      if(this.state.password.length<8)
      this.setState({
        nameEmpty:false,
        emailEmpty:false,
        passwordEmpty:false,
        cpEmpty:false,
        passLength:true
      });
    else if(this.state.cp!==this.state.password)
      this.setState({
        nameEmpty:false,
        emailEmpty:false,
        passwordEmpty:false,
        cpEmpty:false,
        isRegistered:false,
        passLength:false,
        cpCheck:true
      });
      else{
    let newPerson={
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
    };
    axios({
        url:'/api/auth/chglogin',
        method:'post',
        data:newPerson,
        headers:{
            Authorization:localStorage.getItem('usertoken')
        }
    })
         .then(res=>{
           if(res.data){
           this.setState({
             name:'',
             email:'',
             password:'',
             cp:'',
             nameEmpty:false,
             emailEmpty:false,
             passwordEmpty:false,
             cpEmpty:false,
             isRegistered:false,
             passLength:false,
             cpCheck:false,
             isSent:true
           });
           localStorage.removeItem('usertoken');
           this.props.history.push('/login');
        }
         })
         .catch(err=>console.log(err));
         }
}
  }

  render(){
    return(
      <div id="rgt">
      <Navbar/>
        <div className="d-flex justify-content-center align-item-center mt-5">
        <img className="" src="./images/favicon.jpg" alt="Unavailable"/>
        </div>
        <h1 className="display-4 text-center mt-3">Edit your credentials</h1>
        <p className="text-center mt-4">Get your authentication details more strong !</p>
        <div className="container">
        <form className="p-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className={this.state.nameEmpty?'form-control is-invalid':'form-control'} aria-describedby="emailHelp" placeholder="Enter your name" name="name" value={this.state.name} onChange={this.onChange}/>
            <p className="text-danger">{this.state.nameEmpty?'Please provide your name':''}
            </p>
          </div>
  <div className="form-group">
    <label>Email Address</label>
    <input type="email" className={this.state.emailEmpty?'form-control is-invalid':'form-control'} aria-describedby="emailHelp" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.onChange}/>
    <p className="text-danger">{this.state.emailEmpty?'Please provide your email':''}
    </p>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className={this.state.passwordEmpty?'form-control is-invalid':'form-control'} placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange}/>
    <p className="text-danger">{this.state.passwordEmpty?'Please provide your password':''}
    </p>
    <p className="text-danger">{this.state.passLength?'Password must be 8 characters long':''}
    </p>
  </div>
  <div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className={this.state.cpEmpty?'form-control is-invalid':'form-control'} placeholder="Confirm your password" name="cp" value={this.state.cp} onChange={this.onChange}/>
    <p className="text-danger">{this.state.cpEmpty?'Please confirm your password':''}
    </p>
    <p className="text-danger">{this.state.cpCheck?'Password does not match':''}
    </p>
  </div>
  <button type="submit" className="btn btn-outline-primary mb-5 btn-block"><i className="fa fa-user-plus" aria-hidden="true"></i> Update My Credentials
  </button>
</form>
<div className={this.state.isSent?"alert alert-success mt-5":"alert alert-success mt-5 d-none"} role="alert">
  An email is sent to you !
</div>
</div>
</div>
    );
  }
}

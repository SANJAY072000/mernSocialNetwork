import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

export default class Login extends Component {
  componentDidMount(){
    setInterval(()=>this.setState({
      emailEmpty:false,
      passwordEmpty:false,
      ie:false,
      ip:false
    }),7000);
  }
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      emailEmpty:false,
      passwordEmpty:false,
      ie:false,
      ip:false
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    if(!(this.state.email&&this.state.password)){
      if(this.state.email==='')
      this.setState({emailEmpty:true});
      if(this.state.password==='')
      this.setState({passwordEmpty:true});
    }
    else{
      let login={
        email:this.state.email,
        password:this.state.password
      };
      axios({
        method:'post',
        url:'/api/auth/login',
        data:login
      })
           .then(res=>{
             if(res.data.emaildoesnotmatch==='You are not registered')
             this.setState({
               emailEmpty:false,
               passwordEmpty:false,
               ie:true,
               ip:false
             });
            else if(res.data.passworddoesnotmatch==='Sorry! You entered wrong password')
            this.setState({
              emailEmpty:false,
              passwordEmpty:false,
              ie:false,
              ip:true
            });
            else{
              localStorage.setItem('usertoken',res.data.token);
              this.props.history.push('/create');
              this.setState({
                email:'',
                password:'',
                emailEmpty:false,
                passwordEmpty:false,
                ie:false,
                ip:false
              });
            }
           })
           .catch(err=>console.log(err));
    }
  }
  render(){
    return(
      <div id="rgt">
        <Navbar/>
        <div className="d-flex justify-content-center align-item-center mt-5">
        <img className="" src="./images/favicon.jpg" alt="Unavailable"/>
        </div>
        <h1 className="display-2 text-center mt-3">Log In</h1>
        <p className="text-center mt-4">Log In to your <Link to="/" className="dvn mx-1">DevNetwork</Link> account</p>
        <div className="container">
        <form className="p-3" onSubmit={this.onSubmit}>
  <div className="form-group">
    <label>Email Address</label>
    <input type="email" className={this.state.emailEmpty?'form-control is-invalid':'form-control'} aria-describedby="emailHelp" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.onChange}/>
    <p className="text-danger">{this.state.emailEmpty?'Please provide your email':''}
    </p>
    <p className="text-danger">{this.state.ie?'You are not registered':''}
    </p>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className={this.state.passwordEmpty?'form-control is-invalid':'form-control'} placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange}/>
    <p className="text-danger">{this.state.passwordEmpty?'Please provide your password':''}
    </p>
    <p className="text-danger">{this.state.ip?'Sorry! You entered wrong password':''}
    </p>
  </div>
  <button type="submit" className="btn btn-outline-primary mb-5 btn-block"><i className="fa fa-sign-in" aria-hidden="true"></i> Log In</button>
</form>
</div>
<h6 className="text-center font-weight-bold mb-5">Not yet registered ?
<Link to="/register" className="text-primary mx-1"> SignUp </Link> to create your account
</h6>
</div>
);
  }
}

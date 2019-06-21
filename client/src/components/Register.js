import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Register extends Component {
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
      isRegistered:false,
      emailSent:false
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    let newPerson={
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
    };
    axios.post('/api/auth/register',newPerson)
         .then(res=>console.log('Hello'))
         .catch(err=>console.log(err));
         this.setState({
           name:'',
           email:'',
           password:'',
           cp:'',
           nameEmpty:false,
           emailEmpty:false,
           passwordEmpty:false,
           isRegistered:false,
           emailSent:true
         });
         setInterval(()=>this.props.history.push('/login'),5000);
  }

  render(){
    return(
      <div id="rgt">
        <div className="d-flex justify-content-center align-item-center mt-5">
        <img className="" src="./images/favicon.jpg" alt="Unavailable"/>
        </div>
        <h1 className="display-2 text-center mt-3">Sign Up</h1>
        <p className="text-center mt-4">Create your <Link to="/" className="dvn mx-1">DevNetwork</Link> account</p>
        <div className={this.state.emailSent?'alert alert-success text-center':'d-none alert alert-success text-center'} role="alert">
        An email has been sent to you !
        </div>
        <div className="container">
        <form className="p-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter your name" name="name" value={this.state.name} onChange={this.onChange}/>
          </div>
  <div className="form-group">
    <label>Email Address</label>
    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" placeholder="Confirm your password" name="cp" value={this.state.cp} onChange={this.onChange}/>
  </div>
  <button type="submit" className="btn btn-outline-primary mb-5 btn-block"><i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up</button>
</form>
</div>
<h6 className="text-center font-weight-bold mb-5">Already a member ?
<Link to="/login" className="text-primary mx-1"> Login </Link> to your account
</h6>
</div>
    );
  }
}

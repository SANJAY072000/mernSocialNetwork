import React,{Component} from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

export default class Profile extends Component {
  componentDidMount(){
    setInterval(()=>
      this.setState({
      usernameEmpty:false,
      addressEmpty:false,
      skillsEmpty:false,
      aboutEmpty:false,
      isUsername:false,
      aboutFifty:false
    }),7000);
  }
  constructor(props){
    super(props);
    this.state = {
      username:'',
      domain:'None',
      company:'',
      website:'',
      address:'',
      skills:'',
      projects:'',
      about:'',
      usernameEmpty:false,
      addressEmpty:false,
      skillsEmpty:false,
      aboutEmpty:false,
      isUsername:false,
      aboutFifty:false
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  onChange(e){
    if(e.target.name==='skills')
    this.setState({[e.target.name]:e.target.value.toUpperCase()});
    else
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    if(!(this.state.username && this.state.address && this.state.skills && this.state.about)){
      if(this.state.username==='')
      this.setState({usernameEmpty:true});
      if(this.state.address==='')
      this.setState({addressEmpty:true});
      if(this.state.skills==='')
      this.setState({skillsEmpty:true});
      if(this.state.about==='')
      this.setState({aboutEmpty:true});
    }
    else{
      if(this.state.about.length<50)
      this.setState({aboutFifty:true});
      else{
      let profile={
        username:this.state.username,
        address:this.state.address,
        skills:this.state.skills,
        about:this.state.about,
        company:this.state.company,
        website:this.state.website,
        projects:this.state.projects,
        domain:this.state.domain,
      };
      axios({
        method:'post',
        url:'/api/profile/edit',
        data:profile,
        headers:{
          Authorization:localStorage.getItem('usertoken'),
        }
      })
      .then(res=>{
        if(res.data.usernamealreadyexists==='Username already exists')
        this.setState({isUsername:true});
        else if(res.data.profileupdated==='Profile Successfully Updated')
        {
          this.setState({
            username:'',
            domain:'None',
            company:'',
            website:'',
            address:'',
            skills:'',
            projects:'',
            about:'',
            usernameEmpty:false,
            addressEmpty:false,
            skillsEmpty:false,
            aboutEmpty:false,
            isUsername:false,
            aboutFifty:false
          });
          this.props.history.push('/dashboard');
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
        <h1 className="display-4 text-center mt-3">Edit Your Profile</h1>
        <p className="text-center mt-4 lead">Fields marked with * are mandatory</p>
        <div className="container">
        <form className="p-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username *</label>
            <input type="text" className={this.state.usernameEmpty?'form-control is-invalid':'form-control'} aria-describedby="emailHelp" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange}/>
            <p className="text-danger">{this.state.usernameEmpty?'Please provide a username':''}
            </p>
            <p className="text-danger">{this.state.isUsername?'Username already exists':''}
            </p>
          </div>
  <div className="form-group">
    <label>Domain</label><br/>
    <select value={this.state.domain} onChange={this.onChange} name="domain"
    style={{"fontSize":"1.2em"}}>
    <option value="None">None</option>
    <option value="Android Developer">Android Developer</option>
    <option value="Business Analysts">Business Analysts</option>
    <option value="Data Scientist">Data Scientist</option>
    <option value="Ethical Hacker">Ethical Hacker</option>
    <option value="Graphics Designer">Graphics Designer</option>
    <option value="IOS Developer">IOS Developer</option>
    <option value="Network Engineer">Network Engineer</option>
    <option value="ReactNative Developer">ReactNative Developer</option>
    <option value="Software Tester">Software Tester</option>
    <option value="Teacher">Teacher</option>
    <option value="Web Developer">Web Developer</option>
    <option value="Other">Other</option>
    </select>
  </div>
  <div className="form-group">
    <label>Company</label>
    <input type="text" className='form-control' placeholder="Could be your own company or one you work for" name="company" value={this.state.company} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>Website</label>
    <input type="text" className='form-control' placeholder="Could be your own website or a company one" name="website" value={this.state.website} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>Address *</label>
    <input type="text" className={this.state.addressEmpty?'form-control is-invalid':'form-control'} placeholder="Could provide city and state (eg. Mumbai, Maharashtra)" name="address" value={this.state.address} onChange={this.onChange}/>
    <p className="text-danger">{this.state.addressEmpty?'Please provide your address':''}
    </p>
  </div>
  <div className="form-group">
    <label>Skills *</label>
    <input type="text" className={this.state.skillsEmpty?'form-control is-invalid':'form-control'} placeholder="Please use commas to separate them (eg. C,JAVA,PYTHON)" name="skills" value={this.state.skills} onChange={this.onChange}/>
    <p className="text-danger">{this.state.skillsEmpty?'Please provide your skills':''}
    </p>
  </div>
  <div className="form-group">
    <label>Projects</label>
    <input type="text" className='form-control' placeholder="Could provide your github username" name="projects" value={this.state.projects} onChange={this.onChange}/>
  </div>
  <div className="form-group">
    <label>About *</label>
    <textarea className={this.state.aboutEmpty?'form-control is-invalid':'form-control'} name="about" value={this.state.about} onChange={this.onChange} style={{"fontSize":"1.2em","height":"200px"}}></textarea>
    <p className="my-3">Few lines about yourself (at least 50 characters)</p>
    <p className="text-danger">{this.state.aboutEmpty?'Please tell something about yourself':''}
    </p>
    <p className="text-danger">{this.state.aboutFifty?'at least 50 characters':''}
    </p>
  </div>
  <button type="submit" className="btn btn-outline-primary mb-5 btn-block"><i className="fa fa-pencil" aria-hidden="true"></i> Update My Profile</button>
</form>
</div>
</div>
    );
  }
}

import React,{Component} from 'react';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import ProfileList from './components/ProfileList';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
// import Upload from './components/Upload';
import EditProfile from './components/dashboard/EditProfile';
// import UpdatePic from './components/dashboard/UpdatePic';
import AddExp from './components/dashboard/AddExp';
import AddEdu from './components/dashboard/AddEdu';
import EditCred from './components/dashboard/EditCred';
import DelExpEdu from './components/dashboard/DelExpEdu';
import DevProfile from './components/List/DevProfile';
import Post from './components/func/Post';
import Msg from './components/func/Msg';
import Comment from './components/func/Comment';
import {BrowserRouter as Router,Route} from 'react-router-dom';

export default class App extends Component {
  render(){
    return(
  <Router>
    <div>
      <Route path="/" exact component={Welcome}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/profiles" component={ProfileList}/>
      <Route path="/create" component={Profile}/>
      <Route path="/dashboard" component={Dashboard}/>
      {/* <Route path="/upload" component={Upload}/>*/}
      <Route path="/edit-profile" component={EditProfile}/>
      {/*<Route path="/update-pic" component={UpdatePic}/>*/}
      <Route path="/add-experience" component={AddExp}/>
      <Route path="/add-education" component={AddEdu}/>
      <Route path="/edit-credentials" component={EditCred}/>
      <Route path="/del-:expeduid" component={DelExpEdu}/>
      <Route path="/profile-:username" component={DevProfile}/>
      <Route path="/posts-:prfid" component={Post}/>
      <Route path="/comments-:prfid-:pstid" component={Comment}/>
      <Route path="/messages-:prfid" component={Msg}/>
    </div>
  </Router>
    );
  }
}

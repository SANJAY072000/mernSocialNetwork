import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar';

export default class Comment extends Component{
    componentDidMount(){
        axios({
            url:`/api/post/get-${this.props.match.params.prfid}`,
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
            const i=res.data.posts.findIndex(a=>a._id.toString()===this.props.match.params.pstid.toString());
            if(!res.data.posts[i].comments.length)
            this.setState({isComment:true,
                post:res.data.posts[i]});
            else
            this.setState({comments:res.data.posts[i].comments,
                post:res.data.posts[i]});
        })
        .catch(err=>console.log(err));
    }
    componentDidUpdate(){
        axios({
            url:`/api/post/get-${this.props.match.params.prfid}`,
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
            const i=res.data.posts.findIndex(a=>a._id.toString()===this.props.match.params.pstid.toString());
            if(!res.data.posts[i].comments.length)
            this.setState({isComment:true,
                post:res.data.posts[i]});
            else
            this.setState({comments:res.data.posts[i].comments,
                post:res.data.posts[i]});
        })
        .catch(err=>console.log(err));
    }
    constructor(props){
        super(props);
        this.state={
            text:'',
            isComment:false,
            comments:[],
            post:{}
        };
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        axios({
            url:`/api/post/comment/${this.props.match.params.prfid}-${this.props.match.params.pstid}`,
            method:'post',
            headers:{
                Authorization:localStorage.getItem('usertoken')
            },
            data:{text:this.state.text}
        })
        .then(res=>{
            console.log('Successful comment');
            this.setState({text:''});
        })
        .catch(err=>console.log(err));
    }
    render(){
        return(
            <div>
            <Navbar/>
            <Link to={`/posts-${this.props.match.params.prfid}`} 
            className="btn btn-warning my-5 mx-5">Back to Posts</Link>
            <div className="container rounded border my-5">
            <div className="row">
            <div className="col-4">
            <img className="img-fluid rounded-circle mt-3" 
            src={this.state.post.pic} alt="Unavailable" 
            style={{"height":"150px","width":"150px"}}/>
            <br/>
            <p className="mt-4 w-75 ml-1 font-weight-bold text-center">
            {this.state.post.username}</p>
            </div>
            <div className="col-8 pl-3 pt-3">
            <p className="lead">{this.state.post.text}</p>
            </div>
            </div>
            </div>
            <form className="p-4" onSubmit={this.onSubmit}>
            <div className="container">
            <div className="row">
            <div className="col-12 bg-warning rounded">
            <p className="text-light mt-3">Make a comment ...</p>
            </div>
            <div className="col-12 pr-5 py-4 border rounded">
            <textarea name="text" value={this.state.text} onChange={this.onChange}
            className="w-100 border p-2 text-muted rounded" 
            style={{"height":"130px"}} placeholder="Comment on this Post">
            </textarea>
            <button type="submit" className="mt-5 btn btn-outline-warning btn-block">
            Comment
            </button>
            </div>
            </div>
            </div>
            </form>
            {<Cip comments={this.state.comments} 
                prfid={this.props.match.params.prfid} pstid={this.props.match.params.pstid}/>}
            </div>
        );
    }
}

class NoComment extends Component{
    render(){
        return(
            <div className="mt-3">
            <hr/>
            <h1 className="display-4 text-muted text-center">No Comments found</h1>
            </div>
        );
    }
}

class Cip extends Component{
    render(){
        return(
            <div className="container">
            {this.props.comments.map((a,i)=><Just cmt={a} key={i} 
            prfid={this.props.prfid} pstid={this.props.pstid}/>)}
            </div>
        );
    }
}

class Just extends Component{
    constructor(props){
        super(props);
        this.state={
            del:false
        };
        this.onClick=this.onClick.bind(this);
    }
    onClick(e){
        axios({
            url:`/api/post/delcomment/${this.props.prfid}-${this.props.pstid}-${this.props.cmt._id}`,
            method:'delete',
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
            if(res.data.commentcantdelete==='Comment cannot be deleted')
            this.setState({del:true});
            else
            console.log('Comment deleted successfully');
        })
        .catch(err=>console.log(err));
    } 
    render(){
        return(
            <div className="row rounded border my-5 p-3">
            <div className="col-4">
            <h3 className="mt-3 w-75 ml-1 font-weight-bold text-center">
            {this.props.cmt.username}</h3>
            </div>
            <div className="col-8 pl-3 pt-3">
            <p className="lead">{this.props.cmt.text}</p>
            <button className="btn btn-danger btn-sm" onClick={this.onClick} 
            disabled={this.state.del}>
            <i className="fa fa-window-close" aria-hidden="true"></i>  {this.state.del?"This is not your comment":'Delete'}
            </button>
            </div>
            </div>
        );
    }
}























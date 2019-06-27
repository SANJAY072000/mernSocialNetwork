import React,{Component} from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import ActPost from './ActPost';

export default class Post extends Component{
    componentDidMount(){
        axios({
            url:`/api/post/get-${this.props.match.params.prfid}`,
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
            if(res.data.postsnotfound==='Posts not found')
            this.setState({isPosts:true});
            else this.setState({
                posts:res.data.posts
            });

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
            if(res.data.postsnotfound==='Posts not found')
            this.setState({isPosts:true});
            else this.setState({
                posts:res.data.posts
            });

        })
        .catch(err=>console.log(err));
    }
    constructor(props){
        super(props);
        this.state={
            posts:[],
            text:'',
            isPosts:false,
        };
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        const post={
            text:this.state.text
        };
        axios({
            method:'post',
            url:`/api/post/send-${this.props.match.params.prfid}`,
            headers:{
                Authorization:localStorage.getItem('usertoken')
            },
            data:post
        })
        .then(res=>{
            console.log('Successful post');
            this.setState({text:''});
        })
        .catch(err=>console.log(err));
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        return(
            <div>
            <Navbar/>
            <form className="p-4" onSubmit={this.onSubmit}>
            <div className="container">
            <div className="row">
            <div className="col-12 bg-success rounded">
            <p className="text-light mt-3">Say something...</p>
            </div>
            <div className="col-12 pr-5 py-4 border rounded">
            <textarea  value={this.state.text} 
            onChange={this.onChange} name="text"
            className="w-100 border p-2 text-muted rounded" 
            style={{"height":"130px"}} placeholder="Create a Post">
            </textarea>
            <button type="submit" className="mt-5 btn btn-outline-success btn-block">
            Post
            </button>
            </div>
            </div>
            </div>
            </form>
            {<ActPost posts={this.state.posts} 
            prfid={this.props.match.params.prfid}/>}
            </div>
        );
    }
}

class NoPost extends Component{
    render(){
        return(
            <div className="mt-3">
            <hr/>
            <h1 className="display-4 text-muted text-center">No Posts found</h1>
            </div>
        );
    }
}






















import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class ActPost extends Component{
    render(){
        return(
            <div>
    {this.props.posts.map((a,i)=><Aip key={i} pst={a} prfid={this.props.prfid}/>)}
            </div>
        );
    }
}

class Aip extends Component{
    constructor(props){
        super(props);
        this.state={
            del:false,
            isBLike:false,
            isBDisLike:false
        };
        this.onDel=this.onDel.bind(this);
        this.onLike=this.onLike.bind(this);
        this.onDisLike=this.onDisLike.bind(this);
    }
    onLike(e){
        axios({
            url:`/api/post/like/${this.props.prfid}-${this.props.pst._id}`,
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
            if(!(res.data.alreadyliked==='Cannot like again'))
            this.setState({isBLike:true,isBDisLike:false});
        })
        .catch(err=>console.log(err));
    }
    onDisLike(e){
        axios({
            url:`/api/post/dislike/${this.props.prfid}-${this.props.pst._id}`,
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
            if(!(res.data.alreadydisliked==='Cannot dislike again'))
            this.setState({isBDisLike:true,isBLike:false});
        })
        .catch(err=>console.log(err));
    }
    onDel(e){
        axios({
            method:'delete',
            url:`/api/post/delpost/${this.props.prfid}-${this.props.pst._id}`,
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
            if(res.data.postcantdelete==='Post cannot be deleted')
            this.setState({del:true});
            else
            console.log('Post deleted successfully');
        })
        .catch(err=>console.log(err));
    }
    render(){
        return(
            <div className="container p-3 my-3 rounded border">
            <div className="row">
            <div className="col-4">
            <img className="img-fluid rounded-circle mt-3" 
            src={this.props.pst.pic} alt="Unavailable" style={{"height":"150px","width":"150px"}}/>
            <br/>
            <p className="mt-4 w-75 ml-1 font-weight-bold text-center">{this.props.pst.username}</p>
            </div>
            <div className="col-8 pl-3 pt-3">
            <p className="lead">{this.props.pst.text}</p>
            <i className={this.state.isBLike?'fa fa-thumbs-up text-info':'fa fa-thumbs-up'} onClick={this.onLike}
            aria-hidden="true"></i>  {this.props.pst.likes.length}
            <i className={this.state.isBDisLike?'fa fa-thumbs-down ml-3 text-info':'fa fa-thumbs-down ml-3'} onClick={this.onDisLike}
            aria-hidden="true"></i>  {this.props.pst.dislikes.length}
            <Link to={`/comments-${this.props.prfid}-${this.props.pst._id}`} className="btn btn-primary mx-5"><i className="fa fa-id-card" aria-hidden="true"></i>  Comment</Link><br/>
            <button className="btn btn-danger mt-4" onClick={this.onDel} 
            disabled={this.state.del}>
            <i className="fa fa-window-close" aria-hidden="true"></i>  {this.state.del?"This is not your post":'Delete'}
            </button>
            </div>
            </div>
            </div>
        );
    }
}

























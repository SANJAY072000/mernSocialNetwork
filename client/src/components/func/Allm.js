import React,{Component} from 'react';
import Axios from 'axios';

export default class Allm extends Component{
    componentDidMount(){
    this.state.isP=this.props.isP;
    let s=this.props.sent.filter(a=>a.user.toString()===this.props.prfsdid.toString()).reverse();
    let r=this.props.received.filter(a=>a.user.toString()===this.props.prfsdid.toString()).reverse();
    let i=0,j=0,c=[];
    for(;i<s.length&&j<r.length;){
        if(s[i].date<r[j].date)
        {
            c.push(s[i]);
            i++;
        }
        else{
            c.push(r[j]);
            j++;
        }
    }
    for(;i<s.length;c.push(s[i]),++i);
    for(;j<r.length;c.push(r[j]),++j);
    if(c.length>7)
    for(i=0;i<c.length-7;c.shift(),++i);
    this.setState({sent:s,received:r,sr:c});
    }
    constructor(props){
        super(props);
        this.state={
            sent:[],
            received:[],
            sr:[],
            isP:true
        };
    }
    render(){
        return(
            <div>
            <div className="container">
            {this.state.sr.map((a,i)=><Md key={i} msg={a} 
            prfrpid={this.props.prfrpid} prfsdid={this.props.prfsdid} 
            isP={this.state.isP}/>)}
            </div>
            </div>
        );
    }
}

class Md extends Component{
    render(){
        return(
            <div>
            {
            this.props.isP?<div></div>:
            <div className="row rounded border border-dark my-5 p-3">
            <div className="col-4">
            <h3 className="mt-3 w-75 ml-1 font-weight-bold text-center">
            {this.props.msg.username}</h3>
            </div>
            <div className="col-8 pl-3 pt-3">
            <p className="lead">{this.props.msg.text}</p>
            </div>
            </div>
        }
        </div>
        );
    }
}













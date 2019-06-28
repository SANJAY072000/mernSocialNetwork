import React,{Component} from 'react';
import Allm from './Allm';
import axios from 'axios';

export default class Cmp extends Component{
    componentDidMount(){
        this.state.isP=this.props.isP;
        this.state.isF=this.props.isF;
    setInterval(()=>this.setState({textEmpty:false,isSent:false}),7000);
    }
    constructor(props){
        super(props);
        this.state={
            text:'',
            textEmpty:false,
            isP:true,
            isF:false,
            isSent:false
        };
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
    e.preventDefault();
    if(!this.state.text.length)
    this.setState({textEmpty:true});
    else{
    axios({
        url:`/api/message/send-${this.props.prfrpid}`,
        method:'post',
        data:{text:this.state.text},
        headers:{
            Authorization:localStorage.getItem('usertoken')
        }
    })
    .then(res=>console.log('Message sent successfully'))
    .catch(err=>console.log(err));
    this.setState({text:'',textEmpty:false,isSent:true});
}
    }
    render(){
        return(
            <div>
            <form className="p-4 my-5" onSubmit={this.onSubmit}>
            <div className="container">
            <div className="row">
            <div className="col-12 bg-success rounded">
            <p className="text-light mt-3">Message something...</p>
            </div>
            <div className="col-12 pr-5 py-4 border rounded">
            <textarea  value={this.state.text} 
            onChange={this.onChange} name="text"
            className={this.state.textEmpty?'w-100 border p-2 text-muted rounded border-danger':'w-100 border p-2 text-muted rounded'} 
            style={{"height":"130px"}} placeholder="Drop a message">
            </textarea>
            <p className={this.state.textEmpty?'text-danger':''}>
            {this.state.textEmpty?'Please write something':''}
            </p>
            <button type="submit" className="mt-5 btn btn-outline-success btn-block">
            Send
            </button>
            </div>
            </div>
            </div>
            </form>
            <div className={this.state.isSent?'alert alert-success text-center':'alert alert-success d-none text-center'} role="alert">
            Message sent successfully. Reload page now !
            </div>
            {(this.state.isP||this.state.isF)?<div></div>:
            <Allm sent={this.props.sent} received={this.props.received}
            prfsdid={this.props.prfsdid} prfrpid={this.props.prfrpid}
            isP={this.state.isP}/>}
            </div>
        );
    }
}
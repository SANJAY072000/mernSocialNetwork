import React,{Component} from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import Cmp from './Cmp';
import Oh from './Oh';

export default class Msg extends Component{
    constructor(props){
        super(props);
        this.state={
            isP:true,
            isF:false,
            msg:{sent:[],received:[]},
            prfsdid:'',
        };
    }
    componentDidMount(){
        axios({
            url:'/api/profile',
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
        if(res.data._id.toString()===this.props.match.params.prfid.toString())
        this.setState({isP:true});
        else 
        this.setState({prfsdid:res.data._id,isP:false})
    })
    .catch(err=>console.log(err));
        axios({
            url:`/api/message/get-${this.props.match.params.prfid}`,
            headers:{
                Authorization:localStorage.getItem('usertoken')
            }
        })
        .then(res=>{
        if(res.data.nomessageprofile==='Message profile not found')
        this.setState({isF:true});
        else
        this.setState({
        msg:res.data,
        });
        })
        .catch(err=>console.log(err));
    }
    render(){
        return(
            <div>
            <Navbar/>
            {
            this.state.isP?
            <Oh/>:
            <Cmp prfsdid={this.state.prfsdid} sent={this.state.msg.sent} 
            received={this.state.msg.received} isF={this.state.isF}
            prfrpid={this.props.match.params.prfid} isP={this.state.isP}/>}
            </div>
        );
    }
}



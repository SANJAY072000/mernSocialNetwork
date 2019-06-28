import React,{Component} from 'react';

export default class Oh extends Component{
    render(){
        return(
            <div className="d-flex justify-content-center align-items-center vh-100">
            <h2 className="display-5 font-weight-bold">
            Cannot send message to yourself</h2>
            </div>
        );
    }
}
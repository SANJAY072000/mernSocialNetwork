import React,{Component} from 'react';
import Navbar from './Navbar';
import axios from 'axios';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null,
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('pic',this.state.file);
        axios({
            url:'/api/profile/upload',
            method:'post',
            headers:{
                'content-type':'multipart/form-data',
                 Authorization:localStorage.getItem('usertoken')
            },
            data:formData
        })
            .then((response) => {
                console.log("The file is successfully uploaded");
            }).catch((error) => {
                console.log(error);
        });
        this.props.history.push('/dashboard');
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <div id="rgt">
            <Navbar/>
            <div className="d-flex justify-content-center align-item-center mt-5">
            <img className="" src="images/favicon.jpg" alt="Unavailable"/>
            </div>
            <h1 className="display-4 text-center mt-3">Upload your pic</h1>
            <p className="text-center mt-4 lead">Please upload your profile pic</p>
            <div className="container">
            <form onSubmit={this.onFormSubmit} className="p-3">
            <img src='images/upload/man.png' alt="Unavailable" className="img-fluid" width="250" height="250" style={{"marginLeft":"200px"}}/><br/>
                <input type="file" name="pic" onChange={this.onChange} className="mt-5" />
                <button type="submit" className="btn btn-warning">Upload !
                </button>
            </form>
            </div>
            </div>
        )
    }
}


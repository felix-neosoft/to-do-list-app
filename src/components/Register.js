import React, { Component } from 'react'
import axios from 'axios'
import {createTheme, ThemeProvider, TextField, Checkbox, FormControlLabel, Button, Typography, Container} from '@mui/material';




const theme = createTheme ({
    palette:{
        color1:{main:'#FCD757'}
    }
})

const URL = "http://localhost:3001/users"

const RegForName = RegExp('^[a-zA-Z]{2,20}$')
const RegForUsername = RegExp('^[a-zA-Z0-9]{5,20}$')
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {

            fname:"",lname:"", username:"",email:"",password:"",confirm_password:"", error:{fname:"",lname:"", username:"",email:"",password:"",confirm_password:""},
            errorText:{fname:"",lname:"", username:"",email:"",password:"",confirm_password:""}
        }
    }

    handler = (event) =>{
        const {name,value} = event.target
        let errors = this.state.error
        let errorsText = this.state.errorText
        switch(name){
            case 'fname':
                errorsText.fname = RegForName.test(value)?'':"Please Enter First Name"
                if(errorsText.fname!==""){errors.fname="error"}
                else{errors.fname=""}
                break
            case 'lname':
                errorsText.lname = RegForName.test(value)?'':"Please Enter Last Name"
                if(errorsText.lname!==""){errors.lname="error"}
                else{errors.lname=""}
                break
            case 'username':
                errorsText.username = RegForUsername.test(value)?'':"Please Enter Username"
                if(errorsText.username!==""){errors.username="error"}
                else{errors.username=""}
                break    
            case 'email':
                errorsText.email = RegForEmail.test(value)?'':'Email is incorrect Format'
                if(errorsText.email !== ""){errors.email="error"}
                else{errors.email=""}
                break
            case 'password':
                errorsText.password = RegForPassword.test(value)?'':'Password Should contain atleast 1 Lowercase, 1 Uppercase, 1 Number,  1 Special Symbol and 8 Charaters long'
                if(errorsText.password !== ""){errors.password="error"}
                else{errors.password=""}
                break
            case 'confirm_password':
                errorsText.confirm_password = this.state.password === value?'':"Password and Confirm Password does not match"
                if(errorsText.confirm_password!==""){errors.confirm_password="error"}
                else{errors.confirm_password=""}
                break
            default:
        }
        this.setState({error:errors,errorText:errorsText,[name]:value})
    }

    formSubmit=(event)=>{
        event.preventDefault();
        if(this.validate(this.state.errorText))
        { 
            if(this.state.email!=="" && this.state.password!=="" && this.state.fname!=="" && this.state.lname!=="" && this.state.username!==""){
                let data = {"fname":this.state.fname,"lname":this.state.lname,"username":this.state.username,"email":this.state.email,"password":this.state.password}
                axios.post(URL,data).then(res=> window.location.replace("/"))
            }
            else{
                alert("Failed to Register")
            }
            
        }
        else {
            alert("Failed to Register!");
        }
     }
      validate=(errors)=>{
        let valid=true;
        Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
        if(this.state.email==="" || this.state.password===""){valid=false}
        return valid;
     }

    
    
    render() {
        return (
            <div className="login-l">
                <ThemeProvider theme={theme}>
                            <Container>
                                <form onSubmit={this.formSubmit} className="login-form">
                                    <Typography sx={{my:3}} align="center" variant="h3">Register</Typography>
                                    <TextField color="color1" sx={{my:1}} fullWidth error={this.state.error.fname} name="fname" value={this.state.fname} label="First Name" variant="outlined" onChange={this.handler} helperText={this.state.errorText.fname}/>
                                    <TextField color="color1" sx={{my:1}} fullWidth error={this.state.error.lname} name="lname" value={this.state.lname} label="Last Name" variant="outlined" onChange={this.handler} helperText={this.state.errorText.lname}/>
                                    <TextField color="color1" sx={{my:1}} fullWidth error={this.state.error.username} name="username" value={this.state.username} label="Username" variant="outlined" onChange={this.handler} helperText={this.state.errorText.username}/>
                                    <TextField color="color1" sx={{my:1}} fullWidth error={this.state.error.email} name="email" value={this.state.email} label="Email" variant="outlined" onChange={this.handler} helperText={this.state.errorText.email}/>
                                    <TextField color="color1" sx={{my:1}} fullWidth error={this.state.error.password} name="password" value={this.state.password} label="Password" variant="outlined" onChange={this.handler} helperText={this.state.errorText.password}/>
                                    <TextField color="color1" sx={{my:1}} fullWidth error={this.state.error.confirm_password} name="confirm_password" value={this.state.confirm_password} label="Confirm Password" variant="outlined" onChange={this.handler} helperText={this.state.errorText.confirm_password}/>
                                    <Button sx={{my:5, float:"right",px:5}} type="submit" variant="contained">Register</Button>     
                                </form>     
                            </Container>  

                </ThemeProvider>
                
            </div>
        )
    }
}

export default Register
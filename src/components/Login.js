import React, { Component } from 'react'
import axios from 'axios'
import {createTheme, ThemeProvider, TextField, Checkbox, FormControlLabel, Button, Container} from '@mui/material';




const theme = createTheme ({
    palette:{
        color1:{main:'#FCD757'}
    }
})

const URL = "http://localhost:3001/users"
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
             email:"",password:"",error:{email:"",password:""},e_email:"",e_password:"",data:[]
        }
    }
    componentDidMount=async()=>{
        axios.get(URL).then((response)=>{
            this.setState({data:response.data})
        })
        if(sessionStorage.getItem("status")==='isLogged'){
            window.location.replace('/todolist')
        }
        else{
            sessionStorage.setItem("id",null)
            sessionStorage.setItem("status",null)
        }
    }

    handler = (event) =>{
        const {name,value} = event.target
        let errors = this.state.error
        let {e_email,e_password} = ""
        switch(name){
            case 'email':
                errors.email = RegForEmail.test(value)?'':'Email is incorrect Format'
                if(errors.email !== ""){e_email="error"}
                else{e_email=""}
                break
            case 'password':
                errors.password = RegForPassword.test(value)?'':'Password is incorrect Format'
                if(errors.password !== ""){e_password="error"}
                else{e_password=""}
                break
            default:
        }
        this.setState({error:errors,[name]:value,e_email:e_email,e_password:e_password})
    }

    formSubmit=(event)=>{
        event.preventDefault();
        if(this.validate(this.state.error))
        {
            let data = this.state.data
            if(data.some(data => data.email === this.state.email && data.password === this.state.password )){    
                let id = data.findIndex(i=> i.email === this.state.email)
                id = parseInt(id)+1
                sessionStorage.setItem("email",this.state.email)
                sessionStorage.setItem("id",id)
                sessionStorage.setItem("status",'isLogged')
                window.location.replace('/todolist')
            }
            else{
                alert("Username/Password does not exist")
            }
        }
        else {
            alert("Failed to Login!");
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
            <>
                <ThemeProvider theme={theme}>
                            <Container>
                            <form onSubmit={this.formSubmit} className="login-form">
                                <h1>Sign In</h1>
                                <TextField color="color1" sx={{my:1}} fullWidth error={this.state.e_email} name="email" value={this.state.email} label="Email" variant="outlined" onChange={this.handler} helperText={this.state.error.email}/>
                                <TextField type="password" color="color1" sx={{my:3}} fullWidth error={this.state.e_password} name="password" value={this.state.password} label="Password" variant="outlined" onChange={this.handler} helperText={this.state.error.password}/>
                                <FormControlLabel sx={{my:3}} control={<Checkbox color="color1" />} label="Remember Me" />
                                <Button fullWidth sx={{mb:5}} type="submit" variant="contained">Log In</Button>     
                                    
                            </form>       
                            </Container>     
                </ThemeProvider>
                
            </>
        )
    }
}

export default Login
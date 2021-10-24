import React, { Component } from 'react'
import ls from 'localstorage-slim'
import axios from 'axios'

import TodoListAddTask  from '../components/TodoListAddTask'
import {AppBar, Box, Toolbar, Button, createTheme, ThemeProvider, Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import TodoListTable from '../components/TodoListTable';
import UserMenu from '../components/UserMenu';

ls.config.encrypt = true
const URL = "http://localhost:3001/users/"+sessionStorage.getItem("id")
const arrayData = ls.get(sessionStorage.getItem("email")) || []

export class TodoList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             checked:true, userData:[],arrayData:[]
        }
    }
    componentDidMount(){
        axios.get(URL).then(res => 
            this.setState({userData:res.data}))
        
    }

    
    logout = () =>{
        sessionStorage.setItem("id",null)
        sessionStorage.setItem("status",null)
        window.location.replace("/")
    }

    AddTaskComponent = () =>{
        this.setState({checked:false})
    }
    ShowTaskComponent = () =>{
        window.location.replace("/todolist")
    }
    
    render() {
        let displayContent
        if(this.state.checked){
            displayContent = <TodoListTable data = {arrayData}/>
        }
        else{
            displayContent = <TodoListAddTask data = {sessionStorage.getItem("email")} />
        }
        return (
            <div>
                <Box sx={{flexGrow:1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <Button onClick={this.AddTaskComponent} sx={{color:"white", borderColor:"white", mr:5}} variant="outlined"><AddIcon/></Button>
                            <Button onClick={this.ShowTaskComponent} sx={{color:"white", borderColor:"white"}} variant="outlined">Show Task</Button>
                            <UserMenu name={this.state.userData.fname} logout={this.logout}/>
                        </Toolbar>
                    </AppBar>
                </Box>
                <div className="display-content">
                    {displayContent}
                </div>

                
            </div>
        )
    }
}

export default TodoList

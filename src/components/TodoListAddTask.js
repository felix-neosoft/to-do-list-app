import React, {useRef, useState} from 'react'
import {Button, Paper, Box, TextField, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material'
import ls from 'localstorage-slim'


function TodoListAddTask(props) {
    const taskinput = useRef(null)
    const [task,setTask] = useState("")
    const [errorTask, setErrorTask] = useState(null)
    const [errorText, setErrorText] = useState("")
    const [priority,setPriority] = useState('');

    const regForTask = RegExp('^[a-zA-z0-9 ]{6,100}$')

    const handler= () =>  {
       let taskvalue = taskinput.current.value
       let error = regForTask.test(taskvalue)?'':'Task entry must be alphanumeric and length is 6.'
       if(error !== ''){
           setErrorTask("error")
       }
       else{
           setErrorTask(null)
           setTask(taskinput.current.value)
       }
       setErrorText(error)
        
    }

    const handleChange = (event) => {
        setPriority(event.target.value)
    }
    
    const addEntry = () =>{
        if(errorTask === null && priority !== ''){
            let localData = ls.get(props.data) || []
            let data = {"task":task, "priority":priority, status:"false"}
            localData.push(data)
            ls.set(props.data,localData)
            alert("Task Added!")
        }
        else{
            alert("Error!")
        }
    }
    return (
        <div>
            <Paper sx={{width:800, height:400, mx:"auto" ,mt:25}} elevation={6} variant="outlined" >
                <Box >
                    <Typography align="center" sx={{my:2}} variant="h3">To-Do</Typography>
                    <TextField error={errorTask} sx={{width:600, mt:2, mx:12}} type="input" onChange={handler}  inputRef={taskinput} label="Task" variant="outlined" helperText= {errorText}/>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl sx={{width:600,mt:6,mx:12}}>
                            <InputLabel>Priority</InputLabel>
                            <Select value={priority} label="Priority" onChange={handleChange}>
                                <MenuItem value={"Lowest : 1"}>Lowest</MenuItem>
                                <MenuItem value={"Low : 2"}>Low</MenuItem>
                                <MenuItem value={"Average : 3"}>Average</MenuItem>
                                <MenuItem value={"High : 4"}>High</MenuItem>
                                <MenuItem value={"Highest : 5"}>Highest</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button onClick={addEntry} sx={{mt:5, float:"right", mr:13}} variant="contained">Add Task</Button>
                </Box>
            </Paper>
        </div>
    )
}

export default TodoListAddTask

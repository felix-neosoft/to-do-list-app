import React, {useState, useEffect} from 'react'
import {Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ls from 'localstorage-slim'

function TodoListTable(props) {
    const [data,setData] = useState([])
    useEffect(()=>{
        setData(props.data)
    },[])

    const data1 = [{task:"React 1",priority:"1"}]
    const deleteTask = (id) => { 
        data.splice(id,1)
        ls.set(sessionStorage.getItem("email"),data)   
        window.location.replace("/todolist")
        
    }

    const completeTask = (id) =>{
        data[id].status="true"
        ls.set(sessionStorage.getItem("email"),data)   
        window.location.replace("/todolist")

    }
    
    return (
        <div>
            <TableContainer sx={{width:1200, mx:"auto", mt:10}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell  align="center">Sr No.</TableCell>
                            <TableCell>Task</TableCell>
                            <TableCell >Priority</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                     <TableBody>
                        {data.map((value,index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{index+1}</TableCell>
                                <TableCell>{value.status ==="true"?<strike>{value.task}</strike>:value.task}</TableCell>
                                <TableCell >{value.priority}</TableCell>
                                <TableCell align="center"><Button onClick={()=>completeTask(index)} sx={{mr:3, color:"green"}} variant="outlined"><DoneIcon/></Button><Button onClick={()=>deleteTask(index)} sx={{color:"red"}} variant="outlined"><CloseIcon/></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody> 
                </Table>
            </TableContainer>
            
        </div>
    )
}

export default TodoListTable

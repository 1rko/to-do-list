import React, {useState} from "react";
import styles from "./Card.module.css";
import {IconButton, TextField} from "@mui/material";
import {green} from "@mui/material/colors";
import AddCircleIcon from '@mui/icons-material/AddCircle';

type AddItemFormPropsType = {
    addNewItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [newTask, setNewItem] = useState('')
    let [error, setError] = useState<null | string>(null)

    const newTaskChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.currentTarget.value)
    }

    const onKeyPressedHandler = (e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
        setError(() => null)
        if (e?.charCode === 13) {
            onAddNewItemHandler()
        }
    }

    const onAddNewItemHandler = () => {
        if (newTask.trim() === '') {
            setError(() => "Field is required")
            return
        }
        props.addNewItem(newTask)
        setNewItem('')
    }

    return <div>
        <TextField value={newTask}
                   placeholder={'Введите имя для ToDoList'}
                   onChange={newTaskChangeHandler}
                   onKeyPress={onKeyPressedHandler}
                   label="New ToDoList"
                   variant='outlined'
                   size={'small'}
                   id="outlined-error"
                   error={error ? !!styles.errorInput : !!''}
                   helperText={error ? error : ''}
        />
            <div onClick={onAddNewItemHandler} style={{ display:'inline'}}> {/*Создали блок перед IconButton, т.к. ему нельзя добавлять onClick*/}
            <IconButton>
                <AddCircleIcon sx={{color: green[500]}}/>
            </IconButton>
        </div>
    </div>
}
import React from 'react'
import {FilterType, TasksArrayType} from "../App";
import styles from './Card.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export type PropsTasksType = {
    title: string
    tasks: Array<TasksArrayType>
    filter: FilterType
    toDoListId: string

    removeTask: (id: string, todolistId: string) => void
    setTaskFilter: (value: FilterType, toDoListId: string) => void
    addNewTask: (newTask: string, todolistId: string) => void
    editTask: (idTask: string, newTask: string, todolistId: string) => void
    isCompletedChangeTask: (tasks: Array<TasksArrayType>, taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    editListTitle: (title: string, todolistId: string) => void
}

export const Card: React.FC<PropsTasksType> = (props) => {

    const onAllTaskFilter = () => {
        props.setTaskFilter('all', props.toDoListId)
    }
    const onActiveTaskFilter = () => {
        props.setTaskFilter('active', props.toDoListId)
    }
    const onCompletedTaskFilter = () => {
        props.setTaskFilter('completed', props.toDoListId)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.toDoListId)
    }

    const addTask = (title: string) => {
        props.addNewTask(title, props.toDoListId)
    }

    const editListTitle = (title: string) => {
        props.editListTitle(title, props.toDoListId)
    }

    return (
        <div className={styles.card}>
            <h1><EditableSpan title={props.title} onFinishEdit={editListTitle}/>
                <IconButton aria-label="delete"
                            onClick={removeTodolist}
                            size={'small'}
                            color="primary"
                >
                    <DeleteIcon/>
                </IconButton>
            </h1>
            <AddItemForm addNewItem={addTask}/>

            {props.tasks.map((li, ind, arr) => {
                    const onRemoveTaskHandler = () => {
                        props.removeTask(li.id, props.toDoListId)
                    }

                    const onIsCompletedClick = () => {
                        props.isCompletedChangeTask(props.tasks, li.id, props.toDoListId)
                    }

                    const editTask = (title: string) => {
                        props.editTask(li.id, title, props.toDoListId)
                    }

                    return (
                        <li key={li.id} className={li.done ? styles.complitedTask : ''}>
                            <Checkbox checked={li.done} onChange={onIsCompletedClick}/>
                            <EditableSpan title={li.task} onFinishEdit={editTask}/>
                            <IconButton aria-label="delete"
                                        onClick={onRemoveTaskHandler}
                                        size={'small'}
                                        color="primary"
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </li>)
                }
            )}
            <Button onClick={onAllTaskFilter}
                    variant={(props.filter === 'all') ? 'contained' : 'outlined'}
                    size="small">
                All
            </Button>
            <Button onClick={onActiveTaskFilter}
                    variant={(props.filter === 'active') ? 'contained' : 'outlined'}
                    size="small">
                Active
            </Button>
            <Button onClick={onCompletedTaskFilter}
                    variant={(props.filter === 'completed') ? 'contained' : 'outlined'}
                    size="small">
                Completed
            </Button>

        </div>)
}


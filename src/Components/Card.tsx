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
    isCompletedChangeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    editListTitle: (title: string, todolistId: string) => void
}

export const Card: React.FC<PropsTasksType> = React.memo((props) => {

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

    const tasksInCard = (props.tasks) ? props.tasks.map((li, ind, arr) => {
            return   <OneTask key={li.id}
                         task={li}
                         toDoListId={props.toDoListId}

                         isCompletedChangeTask={props.isCompletedChangeTask}
                         editTask={props.editTask}
                         removeTask={props.removeTask}
                />
            }
        ) :
        ''

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

            {tasksInCard}


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
})

export type  PropsOneTaskType = {
    task:TasksArrayType
    //id: string
    toDoListId: string
    //done: boolean
    //title: string

    isCompletedChangeTask: (taskId: string, todolistId: string) => void
    editTask: (idTask: string, newTask: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
}

export const OneTask: React.FC<PropsOneTaskType> = React.memo( (props) => {
    const onRemoveTaskHandler = () => {
        props.removeTask(props.task.id, props.toDoListId)
    }

    const onIsCompletedClick = () => {
        props.isCompletedChangeTask(props.task.id, props.toDoListId)
    }

    const editTask = (title: string) => {
        props.editTask(props.task.id, title, props.toDoListId)
    }

    return (
        <li className={props.task.done ? styles.complitedTask : ''}>
            <Checkbox checked={props.task.done} onChange={onIsCompletedClick}/>
            <EditableSpan title={props.task.task} onFinishEdit={editTask}/>
            <IconButton aria-label="delete"
                        onClick={onRemoveTaskHandler}
                        size={'small'}
                        color="primary"
            >
                <DeleteIcon/>
            </IconButton>
        </li>)
})
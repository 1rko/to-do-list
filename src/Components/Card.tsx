import React from 'react'
import {FilterType, TasksArrayType} from "../App";
import styles from './Card.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    editListTitle: (title:string, todolistId: string) => void
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
            <h1>  <EditableSpan title={props.title} onFinishEdit={editListTitle}/>
                <button onClick={removeTodolist}>х</button>
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
                            <input type="checkbox" checked={li.done} onChange={onIsCompletedClick}/>
                            <EditableSpan title={li.task} onFinishEdit={editTask}/>
                            <button onClick={onRemoveTaskHandler}>x</button>
                        </li>)
                }
            )}
            <button onClick={onAllTaskFilter}
                    className={(props.filter === 'all') ? styles.activeButton : ''}>
                All
            </button>
            <button onClick={onActiveTaskFilter}
                    className={(props.filter === 'active') ? styles.activeButton : ''}>
                Active
            </button>
            <button onClick={onCompletedTaskFilter}
                    className={(props.filter === 'completed') ? styles.activeButton : ''}>
                Completed
            </button>

        </div>)
}


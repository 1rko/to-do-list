import React, {useState} from 'react'
import {FilterType, TasksArrayType} from "../App";
import styles from './Card.module.css'

export type PropsTasksType = {
    title: string
    tasks: Array<TasksArrayType>

    removeTask: (id: string) => void
    setTaskFilter: (filter: FilterType) => void
    addNewTask: (newTask: string) => void
}

export const Card: React.FC<PropsTasksType> = (props) => {
    let [newTask, setNewTask] = useState('')

    const newTaskChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }

    const onAddNewTaskHandler =() =>{
        props.addNewTask(newTask)
        setNewTask('')
    }

    return (
        <div className={styles.card}>
            <h1> {props.title}</h1>
            <input value={newTask}
                   placeholder={'Новая задача'}
                   onChange={newTaskChangeHandler}/>

            <button onClick={onAddNewTaskHandler}>+</button>
            {props.tasks.map(li => {
                    return (
                        <li key={li.id}>
                            <input type="checkbox" checked={li.done}/>
                            <span> {li.task} </span>
                            <button onClick={() => props.removeTask(li.id)}>x</button>
                        </li>)
                }
            )}
            <button onClick={() => props.setTaskFilter('all')}>All</button>
            <button onClick={() => props.setTaskFilter('active')}>Active</button>
            <button onClick={() => props.setTaskFilter('done')}>Finished</button>

        </div>)
}
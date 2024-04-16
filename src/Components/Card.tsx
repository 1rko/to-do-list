import React from 'react'
import {FilterType, TasksArrayType} from "../App";
import styles from './Card.module.css'

export type PropsTasksType = {
    title: string
    tasks: Array<TasksArrayType>

    removeTask: (id: number) => void
    setTaskFilter: (filter: FilterType) => void
}

export const Card: React.FC<PropsTasksType> = (props) => {
    return (
        <div className={styles.card}>
            <h1> {props.title}</h1>
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
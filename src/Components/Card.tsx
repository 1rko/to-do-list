import React from 'react'
import {PropsTasksType} from "../App";
import styles from './Card.module.css'

export const Card: React.FC<PropsTasksType> = (props) => {
    return (
        <div className={styles.card}>
            <h1> {props.title}</h1>
            {props.tasks.map(li => {
                    return (
                        <li key={li.id}>
                            <input type="checkbox" checked={li.done}/>
                            <span> {li.task} </span>
                        </li>)
                }
            )}
            <button>All</button>
            <button>Active</button>
            <button>Finished</button>

        </div>)
}
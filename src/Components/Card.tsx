import React from 'react'
import {PropsTasksType} from "../App";
import styles from './Card.module.css'

export const Card: React.FC<PropsTasksType> = (props) => {
    return (
        <div className={styles.card}>
            <h1> {props.title}</h1>
            {props.list.map(li => {
                    return (
                        <li key={li.id}>
                            <input type="checkbox" checked={li.done}/>
                            <input type="text" value={li.task}/>
                        </li>)
                }
            )}

        </div>)
}
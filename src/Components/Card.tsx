import React, {KeyboardEvent, useState} from 'react'
import {FilterType, TasksArrayType, tasksWithCardTitleType} from "../App";
import styles from './Card.module.css'

export type PropsTasksType = {
    title: string
    tasks: Array<TasksArrayType>

    removeTask: (id: string) => void
    setTaskFilter: (filter: FilterType) => void
    addNewTask: (newTask: string) => void
    isCompletedChangeTask: (tasks: tasksWithCardTitleType, taskId: string, isCompleted: boolean) => void
}

export const Card: React.FC<PropsTasksType> = (props) => {
    let [newTask, setNewTask] = useState('')
    let [error, setError] = useState<null | string>(null)
    let [activeFilter, setActiveFilter] = useState<FilterType>('all')
    //let [isCompletedTask, setisCompletedTask] = useState<boolean>(false)

    const newTaskChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }

    const onAddNewTaskHandler = () => {
        if (newTask.trim() === '') {
            setError(() => "Field is required")
            return
        }

        props.addNewTask(newTask)
        setNewTask('')
    }

    const onKeyPressedHandler = (e: React.KeyboardEvent<HTMLInputElement> | undefined) => {
        setError(() => null)
        if (e?.charCode === 13) {
            onAddNewTaskHandler()
        }
    }

    const onAllTaskFilter = () => {
        props.setTaskFilter('all')
        setActiveFilter('all')
    }
    const onActiveTaskFilter = () => {
        props.setTaskFilter('active')
        setActiveFilter('active')
    }
    const onCompletedTaskFilter = () => {
        props.setTaskFilter('completed')
        setActiveFilter('completed')
    }

    return (
        <div className={styles.card}>
            <h1> {props.title}</h1>
            <input value={newTask}
                   className={error ? styles.errorInput : ''}
                   placeholder={'Новая задача'}
                   onChange={newTaskChangeHandler}
                   onKeyPress={onKeyPressedHandler}
            />

            <button onClick={onAddNewTaskHandler}>+</button>
            {error && <div className={styles.errorText}>{error} </div>}

            {props.tasks.map((li, ind, arr) => {
                    const onRemoveTaskHandler = () => {
                        props.removeTask(li.id)
                    }
                    const onIsCompletedClick = () => {
                        props.isCompletedChangeTask({title: props.title, tasks: arr}, li.id, li.done)

                    }
                    return (
                        <li key={li.id}>
                            <input type="checkbox" checked={li.done} onChange={onIsCompletedClick}/>
                            <span> {li.task} </span>
                            <button onClick={onRemoveTaskHandler}>x</button>
                        </li>)
                }
            )}
            <button onClick={onAllTaskFilter}
                    className={(activeFilter === 'all') ? styles.activeButton : ''}>
                All
            </button>
            <button onClick={onActiveTaskFilter}
                    className={(activeFilter === 'active') ? styles.activeButton : ''}>
                Active
            </button>
            <button onClick={onCompletedTaskFilter}
                    className={(activeFilter === 'completed') ? styles.activeButton : ''}>
                Finished
            </button>

        </div>)
}
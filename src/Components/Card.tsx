import React, {useState} from 'react'
import {FilterType, TasksArrayType} from "../App";
import styles from './Card.module.css'

export type PropsTasksType = {
    title: string
    tasks: Array<TasksArrayType>
    filter: FilterType
    toDoListId: string

    removeTask: (id: string, todolistId: string) => void
    setTaskFilter: (value: FilterType, toDoListId: string) => void
    addNewTask: (newTask: string, todolistId: string) => void
    isCompletedChangeTask: (tasks: Array<TasksArrayType>, taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Card: React.FC<PropsTasksType> = (props) => {
    let [newTask, setNewTask] = useState('')
    let [error, setError] = useState<null | string>(null)

    const newTaskChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }

    const onAddNewTaskHandler = () => {
        if (newTask.trim() === '') {
            setError(() => "Field is required")
            return
        }

        props.addNewTask(newTask, props.toDoListId)
        setNewTask('')
    }

    const onKeyPressedHandler = (e: React.KeyboardEvent<HTMLInputElement> | undefined) => {
        setError(() => null)
        if (e?.charCode === 13) {
            onAddNewTaskHandler()
        }
    }

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
        props.removeTodolist( props.toDoListId)
    }

    return (
        <div className={styles.card}>
            <h1> {props.title} <button onClick={removeTodolist}>х</button> </h1>
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
                        props.removeTask(li.id, props.toDoListId)
                    }

                    const onIsCompletedClick = () => {
                        props.isCompletedChangeTask(props.tasks, li.id, props.toDoListId)
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
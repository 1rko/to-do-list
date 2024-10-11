import React, {MouseEventHandler, useCallback, useReducer, useState} from 'react';
import styles from './App.module.css';
import {Card} from "./Components/Card";
import {v4 as uuidv4} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {Button, Grid} from '@mui/material';
import {allTaskReducer} from "./Reducers/allTaskReducer";
import {toDoListReducer} from "./Reducers/toDoListReducer";
import {actions as allTaskActions} from "./Reducers/allTaskReducer"
import {actions as toDoListActions} from "./Reducers/toDoListReducer"
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from './Reducers/store';
import {Japaneese} from "./Components/Japaneese";

export type TasksArrayType = {
    id: string
    task: string
    done: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export type toDoListsType = {
    id: string
    title: string
    filter: FilterType
}

export type AllTasksType = {
    [key: string]: Array<TasksArrayType>
}

function AppWithRedux() {

    let dispatch = useDispatch()
    const toDoLists = useSelector<AppRootState, Array<toDoListsType>>((state) => state.toDoLists)
    const allTasks = useSelector<AppRootState, AllTasksType>((state) => state.allTasks)

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(allTaskActions.removeTaskAC(taskId, todolistId))
    }, [])

    const addNewTask = useCallback((title: string, todolistId: string) => {
        dispatch(allTaskActions.addNewTaskAC(title, todolistId))
    }, [])

    const editTask = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(allTaskActions.editTaskAC(taskId, title, todolistId))
    }, [])

    const isCompletedChangeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(allTaskActions.isCompletedChangeTaskAC(taskId, todolistId))
    }, [])

    const addNewToDoList = useCallback((title: string) => {
        let newTDId = uuidv4()
        dispatch(toDoListActions.addNewToDoList(title, newTDId))
    }, [])

    return (
        <>
            <Japaneese/>
            <div>Cards</div>

            <div className={styles.cardList}>

                <AddItemForm addNewItem={addNewToDoList}/>
                <Grid container>
                    {toDoLists.map(tDL => {
                        function setTaskFilter(value: FilterType, toDoListId: string) {
                            dispatch(toDoListActions.setTaskFilter(value, toDoListId))            //сетаем исходный массив
                        }

                        let tasksForToDoList = allTasks[tDL.id]

                        if (tDL.filter === 'active') {
                            tasksForToDoList =
                                [...tasksForToDoList.filter(t => t.done === false)]
                        }

                        if (tDL.filter === 'completed') {
                            tasksForToDoList =
                                [...tasksForToDoList.filter(t => t.done === true)]
                        }

                        function removeTodolist(toDoListId: string) {
                            dispatch(toDoListActions.removeTodolist(toDoListId))
                            dispatch(toDoListActions.removeTodolist(toDoListId))
                        }

                        function editTodolistTitle(title: string, toDoListId: string) {
                            dispatch(toDoListActions.editTodolistTitle(title, toDoListId))
                        }

                        return (
                            <Grid item xs={12} sm={4} md={3}
                                  display="flex"
                                  justifyContent="center"
                                  key={tDL.id}>

                                <Card
                                    key={tDL.id}
                                    toDoListId={tDL.id}
                                    title={tDL.title}
                                    tasks={tasksForToDoList}
                                    removeTask={removeTask}
                                    filter={tDL.filter}
                                    setTaskFilter={setTaskFilter}
                                    addNewTask={addNewTask}
                                    editTask={editTask}
                                    isCompletedChangeTask={isCompletedChangeTask}
                                    removeTodolist={removeTodolist}
                                    editListTitle={editTodolistTitle}
                                />
                            </Grid>)
                    })
                    }
                </Grid>
            </div>
        </>
    );
}

export default AppWithRedux;

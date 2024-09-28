import React, {useReducer, useState} from 'react';
import styles from './App.module.css';
import {Card} from "./Components/Card";
import {v4 as uuidv4} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {Grid} from '@mui/material';
import {allTaskReducer} from "./Reducers/allTaskReducer";
import {toDoListReducer} from "./Reducers/toDoListReducer";
import {actions as allTaskActions} from "./Reducers/allTaskReducer"
import {actions as toDoListActions} from "./Reducers/toDoListReducer"
import { createStore } from 'redux'

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

    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    //useReducer
    const [toDoLists, toDoListDispatch] = useReducer(toDoListReducer, [
        {id: toDolistId1, title: 'Projects', filter: 'all'},
        {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
    ]);

    const [allTasks, allTaskDispatch] = useReducer(allTaskReducer, {
        [toDolistId1]: [
            {id: uuidv4(), task: 'SocialNetwork', done: true},
            {id: uuidv4(), task: 'ToDoList', done: true},
        ],
        [toDolistId2]: [
            {id: uuidv4(), task: 'HTML', done: true},
            {id: uuidv4(), task: 'CSS', done: true},
            {id: uuidv4(), task: 'JS', done: false}
        ]
    });

    //

    function removeTask(taskId: string, todolistId: string) {
        allTaskDispatch(allTaskActions.removeTaskAC(taskId, todolistId))
    }

    function addNewTask(title: string, todolistId: string) {
        allTaskDispatch(allTaskActions.addNewTaskAC(title, todolistId))
    }

    function editTask(taskId: string, title: string, todolistId: string) {
        allTaskDispatch(allTaskActions.editTaskAC(taskId, title, todolistId))
    }

    function isCompletedChangeTask(/*tasks: Array<TasksArrayType>,*/ taskId: string, todolistId: string) {
        allTaskDispatch(allTaskActions.isCompletedChangeTaskAC(taskId, todolistId))

        /*let changedArray = allTasks[todolistId].map((t) => {
            if (t.id === taskId) return {id: taskId, task: t.task, done: !t.done}
            else {
                return t
            }
        })

        setAllTasks(() => {
                return {
                    ...allTasks,
                    [todolistId]: [...changedArray]
                }
            }
        )*/
    }

    function addNewToDoList(title: string) {
        let newTDId = uuidv4()
        toDoListDispatch(toDoListActions.addNewToDoList(title, newTDId))
        allTaskDispatch(toDoListActions.addNewToDoList(title, newTDId))


        /*let newToDoList: toDoListsType = {
            id: uuidv4(), title: title, filter: 'all'
        }
        setToDoLists([newToDoList, ...toDoLists])
        setAllTasks({...allTasks, [newToDoList.id]: []})*/
    }

    return (
        <>
            <div>Cards</div>

            <div className={styles.cardList}>

                <AddItemForm addNewItem={addNewToDoList}/>
                <Grid container>
                    {toDoLists.map(tDL => {
                        function setTaskFilter(value: FilterType, toDoListId: string) {
                            toDoListDispatch(toDoListActions.setTaskFilter(value, toDoListId))            //сетаем исходный массив
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
                        toDoListDispatch(toDoListActions.removeTodolist(toDoListId))
                        allTaskDispatch(toDoListActions.removeTodolist(toDoListId))
                        /*let filteredToDoList = toDoLists.filter(tdl => tdl.id !== toDoListId)
                        if (filteredToDoList) {
                            setToDoLists([...filteredToDoList])
                            delete allTasks[toDoListId]
                            setAllTasks(allTasks)
                        }*/
                    }

                        function editTodolistTitle(title: string, toDoListId: string) {
                        toDoListDispatch(toDoListActions.editTodolistTitle(title, toDoListId))
                        /*let findedToDoList = toDoLists.find(tdl => tdl.id === toDoListId)
                        if (findedToDoList) {
                            findedToDoList.title = title
                        }
                        setToDoLists([...toDoLists])*/
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

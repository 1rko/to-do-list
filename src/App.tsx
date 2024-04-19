import React, {useState} from 'react';
import styles from './App.module.css';
import {Card} from "./Components/Card";
import {v4 as uuidv4} from 'uuid';

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

function App() {

    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let [toDoLists, setToDoLists] = useState<Array<toDoListsType>>([
        {id: toDolistId1, title: 'Projects', filter: 'all'},
        {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
    ])

    let [allTasks, setAllTasks] = useState({
        [toDolistId1]: [
            {id: uuidv4(), task: 'SocialNetwork', done: true},
            {id: uuidv4(), task: 'ToDoList', done: true},
        ] as Array<TasksArrayType>,
        [toDolistId2]: [
            {id: uuidv4(), task: 'HTML', done: true},
            {id: uuidv4(), task: 'CSS', done: true},
            {id: uuidv4(), task: 'JS', done: false}
        ] as Array<TasksArrayType>
    })

    function removeTask(taskId: string, todolistId: string) {
        let filteredTasks = allTasks[todolistId].filter(tdl => tdl.id !== taskId)

        setAllTasks(() => {
            return {
                ...allTasks,
                [todolistId]: [...filteredTasks]
            }
        })
    }

    function addNewTask(newTask: string, todolistId: string) {
        setAllTasks(() => {
                return {
                    ...allTasks,
                    [todolistId]: [{id: uuidv4(), task: newTask, done: false}, ...allTasks[todolistId]]
                }
            }
        )
    }

    function isCompletedChangeTask(tasks: Array<TasksArrayType>, taskId: string, todolistId: string) {
        let changedArray = tasks.map((t) => {
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
        )

    }

    return (
        <>
            <div>Cards</div>
            <div className={styles.cardList}>

                {toDoLists.map(tDL => {

                    function setTaskFilter(value: FilterType, toDoListId: string) {
                        let findedToDoList = toDoLists.find(tdl => tdl.id === toDoListId)
                        if (findedToDoList) {
                            findedToDoList.filter = value                 //меняем фильтр в исходном массиве
                            setToDoLists([...toDoLists])            //сетаем исходный массив
                        }
                    };

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
                        let filteredToDoList = toDoLists.filter(tdl => tdl.id !== toDoListId)
                        if (filteredToDoList) {
                            setToDoLists([...filteredToDoList])
                            delete allTasks[toDoListId]
                            setAllTasks(allTasks)
                        }
                    }

                    return (<Card
                        key={tDL.id}
                        toDoListId={tDL.id}
                        title={tDL.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        filter={tDL.filter}
                        setTaskFilter={setTaskFilter}
                        addNewTask={addNewTask}
                        isCompletedChangeTask={isCompletedChangeTask}
                        removeTodolist={removeTodolist}
                    />)
                })
                }
            </div>
        </>
    );
}

export default App;

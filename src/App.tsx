import React, {useState} from 'react';
import styles from './App.module.css';
import {Card} from "./Components/Card";

export type TasksArrayType = {
    id: number
    task: string
    done: boolean
}

export type TasksType = {
    title: string
    tasks: Array<TasksArrayType>
}

export type FilterType = 'all' | 'active' | 'done'

let tasksProjects: TasksType = {
    title: 'Projects',
    tasks: [
        {id: 1, task: 'ToDoList', done: true},
        {id: 2, task: 'Social Network', done: true}
    ]
}

function App() {

    let tasksNeedsToLearn: TasksType = {
        title: 'Needs to learn',
        tasks: [
            {id: 1, task: 'HTML', done: true},
            {id: 2, task: 'CSS', done: true},
            {id: 3, task: 'JS', done: false}
        ]
    }

    let [tasks, setTasks] = useState<TasksType>(tasksNeedsToLearn)
    let [filter, setFilter] = useState<FilterType>('all')

    function removeTask(id: number) {
        setTasks(() => {
            return {
                ...tasks,
                tasks: tasks.tasks.filter(t => t.id !== id)
            }
        })
    }

    function setTaskFilter(filter: FilterType) {
        setFilter(filter)
    }

    let tasksForToDoList=tasks

    if (filter === 'active') {
        tasksForToDoList = {
            ...tasksForToDoList,
            tasks: tasksForToDoList.tasks.filter(t => t.done === false)
        }
    }

    if (filter === 'done') {
        tasksForToDoList = {
            ...tasksForToDoList,
            tasks: tasksForToDoList.tasks.filter(t => t.done === true)
        }
    }

    return (
        <>
            <div>Cards</div>
            <div className={styles.cardList}>
                <Card
                    title={tasksForToDoList.title}
                    tasks={tasksForToDoList.tasks}
                    removeTask={removeTask}
                    setTaskFilter={setTaskFilter}
                />
                {/*<Card title={tasksProjects.title} tasks={tasksProjects.tasks}/>*/}
            </div>
        </>
    );
}

export default App;

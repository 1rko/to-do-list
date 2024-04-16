import React from 'react';
import styles from './App.module.css';
import {Card} from "./Components/Card";

type tasksArrayType = {
    id: number
    task: string
    done: boolean
}

export type PropsTasksType = {
    title: string
    tasks: Array<tasksArrayType>
}

let tasksNeedsToLearn: PropsTasksType = {
    title: 'Needs to learn',
    tasks: [
        {id: 1, task: 'HTML', done: true},
        {id: 2, task: 'CSS', done: true},
        {id: 3, task: 'JS', done: false}
    ]
}

let tasksProjects: PropsTasksType = {
    title: 'Projects',
    tasks: [
        {id: 1, task: 'ToDoList', done: true},
        {id: 2, task: 'Social Network', done: true}
    ]
}

function App() {

    return (
        <>
            <div>Cards</div>
            <div className={styles.cardList}>
                <Card title={tasksNeedsToLearn.title} tasks={tasksNeedsToLearn.tasks}/>
                <Card title={tasksProjects.title} tasks={tasksProjects.tasks}/>
            </div>
        </>
    );
}

export default App;

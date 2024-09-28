import {toDoListReducer} from "./toDoListReducer";
import {v4 as uuidv4} from "uuid";
import {AllTasksType, toDoListsType} from "../App";
import {allTaskReducer} from "./allTaskReducer";
import {actions as toDoListActions} from "./toDoListReducer"


test("new ToDoList must be added", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()
    let toDolistId3 = uuidv4()

    let toDoListsState: Array<toDoListsType> = [
        {id: toDolistId1, title: 'Projects', filter: 'all'},
        {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
    ]

    let allTasksState: AllTasksType = {
        [toDolistId1]: [
            {id: uuidv4(), task: 'SocialNetwork', done: true},
            {id: uuidv4(), task: 'ToDoList', done: true},
        ],
        [toDolistId2]: [
            {id: uuidv4(), task: 'HTML', done: true},
            {id: uuidv4(), task: 'CSS', done: true},
            {id: uuidv4(), task: 'JS', done: false}
        ]
    }

    let action = toDoListActions.addNewToDoList('New toDoList', toDolistId3)

    let newToDoListsState: Array<toDoListsType> = toDoListReducer(toDoListsState, action)
    let newAllTasksState: AllTasksType = allTaskReducer(allTasksState, action)

    const keys = Object.keys(newAllTasksState)
    let idFromTasks = keys[0]
    let idFromTodolists = newToDoListsState[0].id

    expect(newToDoListsState.length).toBe(3);

    ///Проверка одинаковы ли id в Todolists и Tasks
    expect(idFromTodolists).toBe(action.toDoListId);
    expect(idFromTasks).toBe(action.toDoListId);
    expect(Object.keys(newAllTasksState).length).toBe(3);
    console.log(newAllTasksState)

});


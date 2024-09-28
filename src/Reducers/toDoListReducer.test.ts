import {toDoListReducer} from "./toDoListReducer";
import {v4 as uuidv4} from "uuid";
import {AllTasksType, toDoListsType} from "../App";


test("new ToDoList must be added", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()
    let toDolistId3 = uuidv4()

    let state: Array<toDoListsType> = [
        {id: toDolistId1, title: 'Projects', filter: 'all'},
        {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
    ]

    let newState: Array<toDoListsType> = toDoListReducer(state, {
        type: 'toDoListReducer/ADD-NEW-TO-DO-LIST',
        title: 'Shopping list',
        toDoListId: toDolistId3
    })
    expect(newState.length).toBe(3);
});

test("ToDoList must be deleted", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let state: Array<toDoListsType> = [
        {id: toDolistId1, title: 'Projects', filter: 'all'},
        {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
    ]

    let newState: Array<toDoListsType> = toDoListReducer(state, {
        type: 'toDoListReducer/REMOVE-TO-DO-LIST',
        id: toDolistId2
    })
    expect(newState.length).toBe(1);
});

test("todolist TITLE should be changed ", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let state: Array<toDoListsType> = [
        {id: toDolistId1, title: 'Projects', filter: 'all'},
        {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
    ]

    let newState: Array<toDoListsType> = toDoListReducer(state, {
        type: 'toDoListReducer/EDIT-TO-DO-LIST-TITLE',
        id: toDolistId2,
        title: 'card-list'
    })
    expect(newState[1].title).toBe('card-list');
});

test("todolist FILTER should be changed ", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let state: Array<toDoListsType> = [
        {id: toDolistId1, title: 'Projects', filter: 'all'},
        {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
    ]

    let newState: Array<toDoListsType> = toDoListReducer(state, {
        type: 'toDoListReducer/CHANGE-TO-DO-LIST-FILTER',
        id: toDolistId2,
        filter: 'active'
    })
    expect(newState[1].filter).toBe('active');
});
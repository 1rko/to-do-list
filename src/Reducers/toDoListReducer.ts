import {toDoListReducer} from "./toDoListReducer.test";
import {v4 as uuidv4} from "uuid";
import {toDoListsType} from "../App";

let toDolistId1 = uuidv4()
let toDolistId2 = uuidv4()

let state: Array<toDoListsType> = [
    {id: toDolistId1, title: 'Projects', filter: 'all'},
    {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
]

test("new ToDoList must be added", () => {
    let newState = toDoListReducer(state, {type: 'ADD-NEW-TO-DO-LIST', title: 'New toDolist'})
    expect(newState.);
});
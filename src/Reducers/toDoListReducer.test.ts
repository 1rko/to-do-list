import React from 'react';
import {toDoListsType} from "../App";
import {v4 as uuidv4} from 'uuid';

let toDolistId1 = uuidv4()
let toDolistId2 = uuidv4()

let state: Array<toDoListsType> = [
    {id: toDolistId1, title: 'Projects', filter: 'all'},
    {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
]

type ActionType = {
    type: string
    title: string
}

export const toDoListReducer = (state: Array<toDoListsType>, action: ActionType) => {
    switch (action.type) {
        case 'ADD-NEW-TO-DO-LIST': {
            let newToDoList: toDoListsType = {
                id: uuidv4(), title: action.title, filter: 'all'
            }
            return [newToDoList, ...state]
        }

        default:
            console.log(`Error`);
    }

}
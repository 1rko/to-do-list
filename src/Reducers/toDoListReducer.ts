import {FilterType, toDoListsType} from "../App";
import {v4 as uuidv4} from 'uuid';

let toDolistId1 = uuidv4()
let toDolistId2 = uuidv4()

let state: Array<toDoListsType> = [
    {id: toDolistId1, title: 'Projects', filter: 'all'},
    {id: toDolistId2, title: 'Needs to learn', filter: 'all'},
]

export const toDoListReducer = (state: Array<toDoListsType>, action: ActionsType): Array<toDoListsType> => {
    switch (action.type) {
        case 'toDoListReducer/ADD-NEW-TO-DO-LIST': {
            let newToDoList: toDoListsType = {
                id: action.toDoListId, title: action.title, filter: 'all'
            }
            return [newToDoList, ...state]
        }

        case 'toDoListReducer/REMOVE-TO-DO-LIST': {
            /*let newToDoList: toDoListsType = {
                id: uuidv4(), title: action.title, filter: 'all'
            }*/
            return [...state.filter(tdl => tdl.id !== action.id)]
        }

        case 'toDoListReducer/EDIT-TO-DO-LIST-TITLE': {
            let findedToDoList = state.find(tdl => tdl.id === action.id)
            if (findedToDoList) {
                findedToDoList.title = action.title
            }
            return [...state]
        }

        case 'toDoListReducer/CHANGE-TO-DO-LIST-FILTER': {
            let findedToDoList = state.find(tdl => tdl.id === action.id)
            if (findedToDoList) {
                findedToDoList.filter = action.filter
            }
            return [...state]
        }

        default:
            return state
            console.log(`Error`);
    }
}

export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never //если T соответствует типу [key: string]: (...args:any[]) =>  infer U), т.е. ключ: функция - то верни тип U возвращаемого результата

type ActionsType = InferActionTypes<typeof actions>

export const actions = {                           //ActionCreators
    addNewToDoList: (title: string, toDoListId: string) => ({
        type: 'toDoListReducer/ADD-NEW-TO-DO-LIST',
        title: title,
        toDoListId: toDoListId
    } as const),
    removeTodolist: (toDoListId: string) => ({
        type: 'toDoListReducer/REMOVE-TO-DO-LIST',
        id: toDoListId
    } as const),
    editTodolistTitle: (title: string, toDoListId: string) => ({
        type: 'toDoListReducer/EDIT-TO-DO-LIST-TITLE',
        title: title,
        id: toDoListId
    } as const),
    setTaskFilter: (filter: FilterType, toDoListId: string) => ({
        type: 'toDoListReducer/CHANGE-TO-DO-LIST-FILTER',
        filter: filter,
        id: toDoListId
    } as const)
}

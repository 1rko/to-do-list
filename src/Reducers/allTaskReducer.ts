import {FilterType, TasksArrayType, toDoListsType} from "../App";
import {v4 as uuidv4} from 'uuid';
import {actions as toDoListActions, toDolistId1, toDolistId2} from "./toDoListReducer"        //импортируем actions из toDoListReducer, чтобы обработать action здесь

export type AllTasksType = {
    [key: string]: Array<TasksArrayType>
}

let initialState: AllTasksType = {
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

export const allTaskReducer = (state: AllTasksType = initialState, action: ActionsType): AllTasksType => {
    switch (action.type) {
        case 'allTaskReducer/ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: uuidv4(), task: action.title, done: false}, ...state[action.todolistId]]
            }
        }

        case 'toDoListReducer/ADD-NEW-TO-DO-LIST': {            //action из toDoListReducer, чтоб добавить пустой массив
            return {
                [action.toDoListId]: [],
                ...state
            }
        }

        case 'allTaskReducer/REMOVE-TASK': {
            let filteredTasks = state[action.todolistId].filter(task => task.id !== action.taskId)
            return {
                ...state,
                [action.todolistId]: filteredTasks
            }
        }

        case 'toDoListReducer/REMOVE-TO-DO-LIST': {         //action из toDoListReducer, чтоб удалить массив tasks при удалении листа
            let stateCopy = {...state}      //делаем поверхностную копию
            delete stateCopy[action.id]     //удаляем свойство
            return stateCopy
        }

        case 'allTaskReducer/EDIT-TASK': {
            let editableTask = state[action.todolistId].find(task => task.id === action.taskId)
            if (editableTask) {
                editableTask.task = action.title
            }
            return {
                ...state
            }
        }

        case 'allTaskReducer/IS-COMPLETED-CHANGE-TASK': {
            let changedArray = state[action.todolistId].map((t) => {
                if (t.id === action.taskId) return {id: action.taskId, task: t.task, done: !t.done}
                else {
                    return t
                }
            })

            return {
                ...state,
                [action.todolistId]: [...changedArray]
            }
        }

        default:
            return state

    }
}

export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never //если T соответствует типу [key: string]: (...args:any[]) =>  infer U), т.е. ключ: функция - то верни тип U возвращаемого результата

type ActionsType = InferActionTypes<typeof actions> | InferActionTypes<typeof toDoListActions>      //обедияем типы action с типами в actions из toDoListReducer

export const actions = {                           //ActionCreators
    addNewTaskAC: (title: string, todolistId: string) => ({
        type: 'allTaskReducer/ADD-TASK',
        title: title,
        todolistId: todolistId
    } as const),

    removeTaskAC: (taskId: string, todolistId: string) => ({
        type: 'allTaskReducer/REMOVE-TASK',
        taskId: taskId,
        todolistId: todolistId
    } as const),

    editTaskAC: (taskId: string, title: string, todolistId: string) => ({
        type: 'allTaskReducer/EDIT-TASK',
        taskId: taskId,
        title: title,
        todolistId: todolistId
    } as const),

    isCompletedChangeTaskAC: (taskId: string, todolistId: string) => ({
        type: 'allTaskReducer/IS-COMPLETED-CHANGE-TASK',
        taskId: taskId,
        todolistId: todolistId
    } as const)
}

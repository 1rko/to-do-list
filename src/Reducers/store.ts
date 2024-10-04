import {combineReducers, createStore} from "redux";
import {toDoListReducer} from "./toDoListReducer";
import {allTaskReducer} from "./allTaskReducer";

export type AppRootState = ReturnType<typeof rootReducer>

export let rootReducer = combineReducers({
    toDoLists: toDoListReducer,
    allTasks: allTaskReducer
})

export const store = createStore(rootReducer)

//@ts-ignore
window.store = store
//@ts-ignore
window.state = store.getState()
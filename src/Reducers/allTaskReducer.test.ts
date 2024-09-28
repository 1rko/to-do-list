import {allTaskReducer} from "./allTaskReducer";
import {v4 as uuidv4} from "uuid";
import {AllTasksType, toDoListsType} from "../App";

test("New task must be added", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let state: AllTasksType = {
        [toDolistId1]: [
            {id: '1', task: 'SocialNetwork', done: true},
            {id: '2', task: 'ToDoList', done: true},
        ],
        [toDolistId2]: [
            {id: '1', task: 'HTML', done: true},
            {id: '2', task: 'CSS', done: true},
            {id: '3', task: 'JS', done: false}
        ]
    }

    let newState: AllTasksType = allTaskReducer(state, {
        type: 'allTaskReducer/ADD-TASK',
        title: "New object",
        todolistId: toDolistId1
    })

    expect(newState[toDolistId1].length).toBe(3);
    expect(newState[toDolistId1][0].task).toBe("New object");
});

test("task must be deleted", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let state: AllTasksType = {
        [toDolistId1]: [
            {id: '1', task: 'SocialNetwork', done: true},
            {id: '2', task: 'ToDoList', done: true},
        ],
        [toDolistId2]: [
            {id: '1', task: 'HTML', done: true},
            {id: '2', task: 'CSS', done: true},
            {id: '3', task: 'JS', done: false}
        ]
    }

    let newState: AllTasksType = allTaskReducer(state, {
        type: 'allTaskReducer/REMOVE-TASK',
        taskId: '2',
        todolistId: toDolistId2
    })

    expect(newState[toDolistId2].length).toBe(2);
    expect(newState[toDolistId2].every(t=>t.id!='2')).toBeTruthy();

});

test("task must be edited", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let state: AllTasksType = {
        [toDolistId1]: [
            {id: '1', task: 'SocialNetwork', done: true},
            {id: '2', task: 'ToDoList', done: true},
        ],
        [toDolistId2]: [
            {id: '1', task: 'HTML', done: true},
            {id: '2', task: 'CSS', done: true},
            {id: '3', task: 'JS', done: false}
        ]
    }

    let newState: AllTasksType = allTaskReducer(state, {
        type: 'allTaskReducer/EDIT-TASK',
        taskId: '3',
        title:'React',
        todolistId: toDolistId2
    })

    expect(newState[toDolistId2][2].task).toBe('React');
});

test("IS-COMPLETED must be changed", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let state: AllTasksType = {
        [toDolistId1]: [
            {id: '1', task: 'SocialNetwork', done: true},
            {id: '2', task: 'ToDoList', done: true},
        ],
        [toDolistId2]: [
            {id: '1', task: 'HTML', done: true},
            {id: '2', task: 'CSS', done: true},
            {id: '3', task: 'JS', done: false}
        ]
    }

    let newState: AllTasksType = allTaskReducer(state, {
        type: 'allTaskReducer/IS-COMPLETED-CHANGE-TASK',
        taskId: '2',
        todolistId: toDolistId2
    })

    expect(newState[toDolistId2][1].done).toBe(false);
});

test("Tasks list must be deleted", () => {
    let toDolistId1 = uuidv4()
    let toDolistId2 = uuidv4()

    let state: AllTasksType = {
        [toDolistId1]: [
            {id: '1', task: 'SocialNetwork', done: true},
            {id: '2', task: 'ToDoList', done: true},
        ],
        [toDolistId2]: [
            {id: '1', task: 'HTML', done: true},
            {id: '2', task: 'CSS', done: true},
            {id: '3', task: 'JS', done: false}
        ]
    }

    let newState: AllTasksType = allTaskReducer(state, {
        type: 'toDoListReducer/REMOVE-TO-DO-LIST',
        id: toDolistId2
    })

    expect(newState[toDolistId1]).toBeDefined();
    expect(newState[toDolistId2]).toBeUndefined();
});

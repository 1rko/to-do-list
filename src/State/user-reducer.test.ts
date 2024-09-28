import { userReducer } from './user-reducer'

let startState ={
    age:20,
    childrenCount:2,
    name:'Dima'
}

test('user reducer should increment only age', ()=> {
    const endState=userReducer(startState, { type: 'INCREMENT-AGE'})
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only CHILDREN COUNT', ()=> {
    const endState=userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})

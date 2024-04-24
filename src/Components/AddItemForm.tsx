import React, {useState} from "react";
import styles from "./Card.module.css";

type AddItemFormPropsType = {
    addNewItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [newTask, setNewItem] = useState('')
    let [error, setError] = useState<null | string>(null)

    const newTaskChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.currentTarget.value)
    }

    const onKeyPressedHandler = (e: React.KeyboardEvent<HTMLInputElement> | undefined) => {
        setError(() => null)
        if (e?.charCode === 13) {
            onAddNewItemHandler()
        }
    }

    const onAddNewItemHandler = () => {
        if (newTask.trim() === '') {
            setError(() => "Field is required")
            return
        }
        props.addNewItem(newTask)
        setNewItem('')
    }

    return <div>
        <input value={newTask}
               className={error ? styles.errorInput : ''}
               placeholder={'Новая задача'}
               onChange={newTaskChangeHandler}
               onKeyPress={onKeyPressedHandler}
        />

        <button onClick={onAddNewItemHandler}>+</button>
        {error && <div className={styles.errorText}>{error} </div>}
    </div>
}
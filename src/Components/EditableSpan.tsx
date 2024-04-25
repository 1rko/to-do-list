import React, {useState} from "react";

export type EditableSpanPropsType = {
    title: string
    onFinishEdit: (title:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onClickHandler = () => {
        setEditMode(true)
    }

    const onBlurHandler = () => {
        setEditMode(false)
        props.onFinishEdit(title)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        (editMode) ?
            <input
                value={title}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            /> :
            <span onDoubleClick={onClickHandler}> {title} </span>
    )
}
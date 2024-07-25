import React, {FC, ChangeEvent, useState, useEffect} from 'react';
import {ITask} from "../interfaces";
import Button from "./Button";

interface Props{
    active: boolean,
    change: boolean,
    task: ITask | null,
    clickHandler(task: ITask): void,
    closeModal(): void
}

const Modal: FC<Props> = ({active, change, clickHandler, task, closeModal}) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [date, setDate] = useState<string>("")

    const [emptyTitle, setEmptyTitle] = useState<boolean>(false)
    const [emptyDescription, setEmptyDescription] = useState<boolean>(false)
    const [emptyDate, setEmptyDate] = useState<boolean>(false)

    useEffect(() => {
        if (task !== null){
            setTitle(task.title)
            setDescription(task.description)
            setDate(task.created)
        }
        setEmptyTitle(false)
        setEmptyDescription(false)
        setEmptyDescription(false)
    }, [task])

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if(event.target.name === "title"){
            setTitle(event.target.value)
        } else if(event.target.name === "description") {
            setDescription(event.target.value)
        } else if(event.target.name === "date") {
            setDate(event.target.value)
        }
    }

    const closeHandler = () : void => {
        setTitle("")
        setDescription("")
        setDate("")
        setEmptyTitle(false)
        setEmptyDescription(false)
        setEmptyDescription(false)
        closeModal()
    }

    const handleClick = (): void => {
        if(title === "" || description === "" || date === ""){
            if(title === ""){
                setEmptyTitle(true)
            } else {
                setEmptyTitle(false)
            }
            if(description === ""){
                setEmptyDescription(true)
            } else {
                setEmptyDescription(false)
            }
            if(date === ""){
                setEmptyDate(true)
            } else {
                setEmptyDescription(false)
            }
        } else {
            setEmptyTitle(false)
            setEmptyDescription(false)
            setEmptyDate(false)

            let newTask: ITask

            if(task === null){
                newTask = {
                    id: new Date().getTime(),
                    title: title,
                    description: description,
                    created: date
                }
            } else {
                newTask = {
                    id: task.id,
                    title: title,
                    description: description,
                    created: date
                }
            }
            clickHandler(newTask)
            setTitle("")
            setDescription("")
            setDate("")
        }
    }

    return (
        <div
            style={active ? {display: "block"} : {display: "none"}}
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <label
                                        htmlFor="title"
                                        className="text-xl ml-2"
                                    >
                                        Заголовок
                                    </label>
                                    <input
                                        style={emptyTitle ? {border: "2px solid red"} : {border: "2px solid #B4B4B4FF"}}
                                        value={title}
                                        name="title"
                                        type="text"
                                        className="w-full p-2 pl-1 line-clamp-1 text-xl border-2 border-gray-300 rounded-md mt-1 mb-4"
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="description"
                                        className="text-xl ml-2"
                                    >
                                        Описание
                                    </label>
                                    <input
                                        style={emptyDescription ? {border: "2px solid red"} : {border: "2px solid #B4B4B4FF"}}
                                        value={description}
                                        name="description"
                                        type="text"
                                        className="w-full p-2 pl-1 line-clamp-1 text-xl border-2 border-gray-300 rounded-md mt-1 mb-4"
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="date"
                                        className="text-xl ml-2"
                                    >
                                        Дата
                                    </label>
                                    <input
                                        style={emptyDate ? {border: "2px solid red"} : {border: "2px solid #B4B4B4FF"}}
                                        value={date}
                                        name="date"
                                        type="date"
                                        className="w-full p-2 line-clamp-1 text-xl border-2 border-gray-300 rounded-md mt-1 mb-1"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                            <Button color={"red"} btnValue={"Отмена"} clickHandler={closeHandler}/>
                            <Button color={"green"} btnValue={change ? "Изменить" : "Создать"} clickHandler={handleClick}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

// import React from 'react';
// import {ITask} from "../interfaces";
// interface Props{
//     task: ITask,
//     completeTask(taskName:string): void
// }


// function TodoTask({task, completeTask}:Props) {
//     return (
//         <div>{task.taskName} {task.deadline}
//             <button onClick={() => completeTask(task.taskName)}>Delete</button>
//         </div>
//     );
// }

// export default TodoTask;

export default Modal;
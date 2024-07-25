import React, {FC, useEffect, useState} from 'react';
import {ITask} from "./interfaces";
import TodoTask from "./components/TodoTask";
import Modal from "./components/Modal";
import './index.css'
import Button from "./components/Button";
import {$host} from "./http";

const App: FC = () => {
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [change, setChange] = useState<boolean>(false)
    const [activeTask, setActiveTask] = useState<null | ITask>(null)
    const [todo, setTodo] = useState<ITask[]>([])

    const getTasks = (): void => {
        $host.get('/').then( result => {
            setTodo(result.data)
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    const handleUpdate = (task: ITask): void => {
        setChange(true)
        setActiveTask(task)
        setActiveModal(true)
    }

    const deleteTask = (task: ITask): void => {
        $host.post('/delete', task).then(() => getTasks())
    }

    const createTask = (task: ITask): void => {
        $host.post('/create', task).then(() => getTasks())
        closeModal()
    }

    const updateTask = (task: ITask): void => {
        $host.post('/update', task).then(() => getTasks())
        closeModal()
    }

    const closeModal = (): void => {
        setChange(false)
        setActiveTask(null)
        setActiveModal(false)
    }

  return (
        <div className="App">
            <Modal active={activeModal} change={change} task={activeTask} clickHandler={change ? updateTask : createTask} closeModal={closeModal}/>
            <ul role="list" className="w-3/4 flex flex-col gap-4 mb-10">
                {todo.map((task) =>{
                    return <TodoTask key={task.id} task={task} deleteTask={deleteTask} updateTask={handleUpdate} />
                })}
            </ul>
            <Button color={"blue"} btnValue={"Добавить задачу"} clickHandler={() => setActiveModal(true)} />
        </div>
  );
}

export default App;

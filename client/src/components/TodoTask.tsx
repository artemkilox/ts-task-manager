import React, {FC} from 'react';
import {ITask} from "../interfaces";
import Button from "./Button";

interface Props{
    task: ITask,
    deleteTask(task: ITask): void,
    updateTask(task: ITask): void
}

const TodoTask: FC<Props> = ({task, deleteTask, updateTask}) => {
    return (
        <li className="task-item flex justify-between gap-x-6 py-5 p-5 rounded-2xl shadow-lg">
            <div className="flex min-w-0 gap-x-4 w-3/4">
                    <div className="min-w-0 flex-auto">
                        <p className="text-xl font-semibold leading-6 text-gray-900">{task.title}</p>
                        <p className="mt-1 truncate text-l leading-5 text-gray-500">{task.description}</p>
                    </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start">
                <p className="text-l leading-6 text-gray-900">Дата создания</p>
                <p className="mt-1 text-l leading-5 text-gray-500">{task.created}</p>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start">
                <Button color={"blue"} btnValue={"Изменить"} clickHandler={() => updateTask(task)}/>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start">
                <Button color={"red"} btnValue={"Удалить"} clickHandler={() => deleteTask(task)}/>
            </div>
        </li>
    );
}

export default TodoTask;
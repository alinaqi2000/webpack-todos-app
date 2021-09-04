import AppContext from '../context/AppContext'
import React, { useContext } from 'react'
import Todo from '../models/Todo'
import toastr from 'toastr'
import { options } from '../utils'
export default function TodoList() {
    const context = useContext(AppContext)
    const changeStatus = (index: number, todo: Todo) => {
        todo.status = todo.status == "completed" ? "pending" : "completed";
        context.updateTodo(index, todo)
        toastr.success("Status changed successfully.", "", options)
    }
    return (
        <ul className="todos mt-5">
            {
                context.todos.length ?
                    context.todos.map((todo, i) => <li key={todo.id}>
                        <div>
                            {todo.title}
                            {todo.status == "pending" ? <span onClick={() => changeStatus(i, todo)} className="badge badge-warning">Pending</span> : <span onClick={() => changeStatus(i, todo)} className="badge badge-success">Completed</span>}
                        </div>
                        <div>
                            <button onClick={() => {
                                context.deleteTodo(i)
                                toastr.success("Item deleted successfully.", "", options)
                            }} className="btn bg-white"><i className="fas fa-trash"></i></button>
                        </div>
                    </li>
                    )
                    : <li>No todo item found</li>
            }

        </ul>
    )
}

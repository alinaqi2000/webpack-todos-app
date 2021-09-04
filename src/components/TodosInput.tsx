import AppContext from '../context/AppContext';
import Todo from '../models/Todo';
import React, { FormEvent, useContext, useState } from 'react'
import toastr from 'toastr';
import { options } from '../utils';
export default function TodosInput() {
    const [item, setItem] = useState("")
    const context = useContext(AppContext)
    const addTodo = (e: FormEvent) => {
        e.preventDefault();
        if (!item) {
            toastr.error("Please add a todo item.")
        } else {
            context.addTodo(new Todo(context.todos.length + 1, item, "pending", new Date()))
            toastr.success("Todo item added successfully.", "", options)
            setItem("")
        }
    }
    return (
        <div>
            <form method="post" onSubmit={addTodo}>
                <div className="form-group">
                    <input type="text" value={item} onChange={(e: any) => setItem(e.target.value)} placeholder="Add todo item" className="form-control" />
                </div>
            </form>
        </div>
    )
}

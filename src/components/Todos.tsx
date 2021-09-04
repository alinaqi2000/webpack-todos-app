import { navigate, RouteComponentProps } from '@reach/router'
import User from '../models/User'
import React, { ComponentProps, useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import toastr from 'toastr';
import Todo from '../models/Todo';
import TodosInput from './TodosInput';
import TodoList from './TodoList';
export default function Todos(props: RouteComponentProps) {
    const context = useContext(AppContext)
    useEffect(() => {
        validate()
    }, [])
    const validate = async () => {
        const user: User | null = await JSON.parse(localStorage.getItem("current_user")) || null
        if (!user) {
            navigate("/auth")
            return
        }
        const todos: Todo[] | null = await JSON.parse(localStorage.getItem("user_todos_" + user.id)) || []
        context.setUser(user)
        context.setTodos(todos)
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <TodosInput />
                <TodoList />
            </div>
        </div>
    )
}

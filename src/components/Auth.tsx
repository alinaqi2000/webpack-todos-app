import { navigate, RouteComponentProps } from '@reach/router'
import AppContext from '../context/AppContext'
import User from '../models/User'
import React, { useContext, useEffect, useState } from 'react'
import toastr from 'toastr';
import Todo from '../models/Todo';
import { options } from '../utils';
export default function Auth(props: RouteComponentProps) {
    const [form, setForm] = useState({ email: "", password: "" })
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")
    const context = useContext(AppContext)
    const registerUser = async () => {
        const users: User[] = await JSON.parse(localStorage.getItem("users")) || []
        const userIndx = users.findIndex((user) => user.email === form.email);
        if (userIndx === -1) {
            users.push(new User(users.length + 1, form.email, form.password, new Date()));
            localStorage.setItem("users", JSON.stringify(users))
            setMessage("")
            setSuccess("User registered, Please login to continue.")
            setForm({ email: "", password: "" })
        } else {
            setMessage("Email already exists!")
        }
    }
    const loginUser = async () => {
        const users: User[] = await JSON.parse(localStorage.getItem("users")) || []
        const userIndx = users.findIndex((user) => user.email === form.email && user.password === form.password);
        if (userIndx === -1) {
            setMessage("Invalid login credentials!")
        } else {
            const user = users[userIndx];
            toastr.success('Welcome ' + user.email + " to your todo list.", "", options)
            context.setUser(user)
            const todos: Todo[] | null = await JSON.parse(localStorage.getItem("user_todos_" + user.id)) || []
            context.setTodos(todos)
            navigate("/")
            return
        }
    }
    useEffect(() => {
        validate()
    }, [])
    const validate = async () => {
        const user: User | null = await JSON.parse(localStorage.getItem("current_user")) || null
        context.setUser(user)
        if (user) {
            toastr.success('Welcome ' + user.email + " to your todo list.", "", options)
            navigate("/")
        }
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                {message && <p className="mb-3 text-danger">{message}</p>}
                {success && <p className="mb-3 text-success">{success}</p>}
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" value={form.password} onChange={(e: any) => setForm({ ...form, password: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <button onClick={loginUser} className="btn btn-info btn-sn btn-block">Login</button>
                    <button onClick={registerUser} className="btn btn-info btn-sn btn-block">Register</button>
                </div>
            </div>
        </div>
    )
}

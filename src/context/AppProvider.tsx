import User from '../models/User';
import React from 'react'
import AppContext, { initialContext, AppCtx } from './AppContext';
import Todo from 'models/Todo';


interface Props {
    children: JSX.Element | JSX.Element[]
}
export default class App extends React.Component {
    state: AppCtx = initialContext;
    render() {
        return (
            <AppContext.Provider value={{
                ...this.state,
                setUser: (user: User | null) => {
                    localStorage.setItem("current_user", JSON.stringify(user))
                    this.setState({ ...this.state, user })
                },
                setTodos: (todos: Todo[]) => {
                    localStorage.setItem("user_todos_" + this.state.user.id, JSON.stringify(todos))
                    this.setState({ ...this.state, todos })
                },
                addTodo: (todo: Todo) => {
                    const todos = this.state.todos;
                    todos.push(todo)
                    localStorage.setItem("user_todos_" + this.state.user.id, JSON.stringify(todos))
                    this.setState({ ...this.state, todos })
                },
                updateTodo: (index: number, todo: Todo) => {
                    const todos = this.state.todos;
                    todos[index] = todo;
                    localStorage.setItem("user_todos_" + this.state.user.id, JSON.stringify(todos))
                    this.setState({ ...this.state, todos })
                },
                deleteTodo: (index: number) => {
                    const todos = this.state.todos;
                    todos.splice(index, 1);
                    localStorage.setItem("user_todos_" + this.state.user.id, JSON.stringify(todos))
                    this.setState({ ...this.state, todos })
                },
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

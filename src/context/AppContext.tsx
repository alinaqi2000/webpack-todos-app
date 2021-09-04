import { createContext } from 'react';
import Todo from '../models/Todo'
import User from '../models/User'

export interface AppCtx {
    user: User
    todos: Todo[],
    setUser: (user: User | null) => void
    setTodos: (todo: Todo[]) => void
    addTodo: (todo: Todo) => void
    updateTodo: (index: number, todo: Todo) => void
    deleteTodo: (index: number) => void
}

export const initialContext: AppCtx = {
    user: null,
    todos: [],
    setUser: (user: User | null) => { },
    setTodos: (todo: Todo[]) => { },
    addTodo: (todo: Todo) => { },
    updateTodo: (index: number, todo: Todo) => { },
    deleteTodo: (index: number) => { },

}
const AppContext = createContext(initialContext);
export default AppContext;
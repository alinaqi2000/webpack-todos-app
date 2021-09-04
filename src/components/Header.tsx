import AppContext from '../context/AppContext'
import React, { useContext } from 'react'
import { navigate } from '@reach/router'

export default function Header() {
    const context = useContext(AppContext)
    const logOutUser = () => {
        context.setUser(null)
        navigate("/auth")
    }

    return (
        <header className="mb-5 py-3">
            <h3>Todos App</h3>
            {
                context.user ? <button onClick={logOutUser} className="btn btn-sm btn-danger">Logout</button> :
                    <div>
                        {/* <button className="btn btn-sm btn-info">Register</button>
                        <button onClick={loginUser} className="btn btn-sm btn-info">Login</button> */}
                    </div>
            }


        </header>
    )
}

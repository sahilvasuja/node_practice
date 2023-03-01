
import { useState } from 'react'
// import styles from '../styles/Home.module.css' 
export const Header=()=>{
    const [input,setInput]=useState('')

    return (
    <>
        <div className="container">
            <h1 className="text-todo">Todos</h1>
        </div>
    </>
    )
}
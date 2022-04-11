import React from 'react'

function TodoCard({ title, description, created, status }) {
    return (
        <div>
            <h2>{title}</h2>
            <h3>{description}</h3>
            <h3>{created}</h3>
            <h3>{status}</h3>
        </div>
    )
}

export default TodoCard
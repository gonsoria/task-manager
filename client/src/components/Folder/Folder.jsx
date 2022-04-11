import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TodoCard from '../TodoCard/TodoCard'

function Folder() {
    const { id } = useParams()
    const profile = useSelector(state => state.profile)

    let todos = profile.folder.filter(f => f.id === Number(id))

    console.log(todos[0].todo)
    return (
        <div>
            {
                todos[0].todo.map(task =>
                    <TodoCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        created={task.createdAt}
                        status={task.todoStatus}
                    />
                )
            }
        </div>
    )
}

export default Folder
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFolder } from 'react-icons/bs'
import Button from 'react-bootstrap/Button'
import styles from '../Profile/Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFolder } from '../../redux/actions'


function Folder({ folderId, folderName, userId }) {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const [warning, setWarning] = useState(false)

    const handleDelete = (folderId) => {
        if (warning) {
            dispatch(deleteFolder(folderId))
            setWarning(false)
        }
    }
    return (
        <div className={styles.folderContainer}>
            <BsFolder className={styles.icon} />
            <div className={styles.folderInfo}>
                <Link to={'/folder/' + folderId} >
                    <h5>{folderName}</h5>
                </Link>
                <h6>Items: {
                    todos?.filter(todo => todo.folderId === folderId).length
                }</h6>
            </div>
            <div >
                <Button
                    variant="outline-danger"
                    onClick={() => setWarning(true)}
                >
                    Delete folder
                </Button>
            </div>
            {warning === true ?
                <div className={styles.alert}>
                    All items inside this folder will be deleted, are you sure you want to complete de action?
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(folderId)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => setWarning(false)}
                    >
                        Cancel
                    </Button>
                </div> : null

            }
        </div>
    )
}

export default Folder
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFolder } from 'react-icons/bs'
import Button from 'react-bootstrap/Button'
import styles from '../Profile/Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFolder } from '../../redux/actions'
import { AiOutlineDelete } from 'react-icons/ai'
import Alert from 'react-bootstrap/Alert'

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
        <div className={styles.container}>
            <div className={styles.folderContainer}>
                <div className={styles.iconContainer}>
                    <BsFolder className={styles.icon} />
                    <h6 className={styles.items}>Items: {
                        todos?.filter(todo => todo.folderId === folderId).length
                    }</h6>
                </div>
                <div className={styles.folderInfo}>
                    <Link to={'/folder/' + folderId} >
                        <h5>{folderName}</h5>
                    </Link>
                </div>
                <div >
                    <Button
                        variant="outline-danger"
                        onClick={() => setWarning(true)}
                    >
                        <AiOutlineDelete className={styles.iconDelete} />
                    </Button>
                </div>
            </div>
            <div className={styles.alertContainer}>
                {warning === true ?
                    <Alert variant="danger" >
                        <p>
                            All items inside this folder will be deleted, are you sure you want to complete de action?
                        </p>
                        <div className={styles.alertButtonContainer}>
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
                        </div>
                    </Alert>
                    : null

                }
            </div>
        </div>

    )
}

export default Folder
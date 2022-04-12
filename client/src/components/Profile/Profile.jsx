import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import styles from '../../styles/Styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createFolder, deleteFolder } from '../../redux/actions'

function Profile() {
    const profileData = useSelector(state => state.profile)
    const folders = useSelector(state => state.folders)
    const todos = useSelector(state => state.todos)

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormData = {
        folderName: '',
        userId: profileData.id
    }

    const [folderData, setFolderData] = useState(initialFormData)

    const handleChange = (e) => {
        e.preventDefault()
        setFolderData({
            ...folderData,
            [e.target.name]: e.target.value
        })
    }

    const handleDelete = (folderId) => {
        dispatch(deleteFolder(folderId))
    }

    const handleNewFolder = (e) => {
        e.preventDefault()
        dispatch(createFolder(folderData))
        setFolderData(initialFormData)
    }

    return (
        <div>
            <h2>{profileData.email}</h2>
            <Button variant="dark" onClick={handleShow}>
                New folder
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleNewFolder}>
                        <Form.Group className={styles.textContainer} controlId="formBasicEmail">
                            <Form.Label >Folder name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Name"
                                name="folderName"
                                value={folderData.folderName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="dark" size="lg" className={styles.button} type='submit'>
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <div>
                {
                    folders?.map((fold, i) => (
                        <div key={i}>
                            <Link to={'/folder/' + fold.id} >
                                <h3>{fold?.folderName}</h3>
                            </Link>
                            <h4>Total todos: {
                                todos?.filter(todo => todo.folderId === fold.id).length
                            }</h4>
                            <Button variant="dark" onClick={() => handleDelete(fold.id)}>
                                Delete folder
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Profile
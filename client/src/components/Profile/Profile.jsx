import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import styles from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createFolder } from '../../redux/actions'
import Folder from '../Folder/Folder'

function Profile() {
    const profileData = useSelector(state => state.profile)
    const folders = useSelector(state => state.folders)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormData = {
        folderName: '',
        userId: profileData.id
    }

    const [folderData, setFolderData] = useState(initialFormData)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        e.preventDefault()
        setFolderData({
            ...folderData,
            [e.target.name]: e.target.value
        })
    }



    const handleNewFolder = (e) => {
        e.preventDefault()
        if (folderData.folderName === '') {
            setError('Folder name is required')
            return;
        } else {
            dispatch(createFolder(folderData))
            setFolderData(initialFormData)
            handleClose()
        }
    }

    return (
        <div>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.profileTitle}>Wellcome</h1>
                    <h4 className={styles.profileSubtitle}>User:   {profileData.email}</h4>
                </div>
                <div>
                    <Button variant="dark" onClick={handleShow} >
                        New folder
                    </Button>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create new folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleNewFolder}>
                        <Form.Group className={styles.textContainer} controlId="formBasicEmail">
                            <Form.Label> Folder name </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Name"
                                name="folderName"
                                value={folderData.folderName}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                {
                                    error === 'Folder name is required' ? error : null
                                }
                            </Form.Text>

                        </Form.Group>
                        <div className={styles.buttonContainer}>
                            <Button variant="dark" size="lg" type='submit'>
                                Create
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className={styles.foldersContainer}>
                {
                    folders?.map((folder, i) => (
                        <Folder
                            key={i}
                            folderId={folder.id}
                            folderName={folder.folderName}
                            userId={folder.userId}
                        />
                    ))
                }
            </div>
        </div >
    )
}

export default Profile
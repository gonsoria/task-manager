import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TodoCard from '../TodoCard/TodoCard'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import styles from '../../styles/Styles.module.css'
import { createTodo, getProfileData } from '../../redux/actions'


function Folder() {
    const { id } = useParams()
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormValue = {
        title: '',
        description: '',
        folderId: id
    }

    const [formValue, setFormValue] = useState(initialFormValue)

    const handleChange = (e) => {
        e.preventDefault()
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    let todos = profile?.folder?.filter(f => f.id === Number(id))
    let actualFolder = profile?.folder?.filter(f => f.id === Number(id))

    const handleAddToDo = (e) => {
        e.preventDefault()
        dispatch(createTodo(formValue))
        console.log(formValue)
        setFormValue(initialFormValue)
    }

    useEffect(() => {
        dispatch(getProfileData(profile.email))
    })

    return (
        <div>
            <div>
                <h2>Folder {`> ${actualFolder[0]?.folderName}`}</h2>
            </div>
            <Button variant="dark" onClick={handleShow}>
                Add new to do
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new To do</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddToDo}>
                        <Form.Group className={styles.textContainer} controlId="formBasicEmail">
                            <Form.Label >Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Todo title"
                                name="title"
                                value={formValue.title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className={styles.textContainer} controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                type="text"
                                placeholder="Add a description.."
                                name='description'
                                value={formValue.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="dark" size="lg" className={styles.button} type='submit'>
                            Add to-do
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {
                todos[0].todo.map(task =>
                    <TodoCard
                        key={task.id}
                        id={task.id}
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
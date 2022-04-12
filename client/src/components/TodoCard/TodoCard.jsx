import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import styles from '../../styles/Styles.module.css'

import { deleteTodo, editTodo } from '../../redux/actions'


function TodoCard({ title, description, created, status, id }) {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormValue = {
        title: '',
        description: '',
        todoStatus: ''
    }

    const [formValue, setFormValue] = useState(initialFormValue)

    const handleChange = (e) => {
        e.preventDefault()
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        dispatch(editTodo(formValue, id))
        setFormValue(initialFormValue)
    }

    const handleStatus = () => {
        if (status === 'INCOMPLETE') {
            dispatch(editTodo({
                title: '',
                description: '',
                todoStatus: 'COMPLETE'
            }, id))
        } else {
            dispatch(editTodo({
                title: '',
                description: '',
                todoStatus: 'INCOMPLETE'
            }, id))

        }

    }

    const handleDelete = () => {
        dispatch(deleteTodo(id))
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEdit}>
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
                            Edit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{created.split('T')[0]}</Card.Subtitle>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button variant="dark" onClick={handleShow}>Edit</Button>

                    <Button variant="dark" onClick={handleDelete}>Delete</Button>

                    <Button variant=
                        {status === 'INCOMPLETE' ? 'outline-success' : 'success'}
                        onClick={handleStatus}
                    >
                        {
                            status === 'INCOMPLETE' ? 'Complete' : 'Completed'
                        }
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TodoCard
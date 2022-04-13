import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import styles from './TodoCard.module.css'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai'

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
            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
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
                        <div className={styles.buttonContainer}>
                            <Button variant="dark" size="lg" className={styles.button} type='submit'>
                                Edit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center"
            >
                <div className={styles.todoInfo}>
                    <h2 className={styles.todoTitle}>{title}</h2>
                    <p>{description}</p>
                    <p>Created: {created.split('T')[0]}</p>
                </div>
                <div className={styles.buttons}>
                    <Button variant="primary" onClick={handleShow} className={styles.button}>
                        <AiOutlineEdit className={styles.icon} /> </Button>

                    <Button variant="danger" onClick={handleDelete} className={styles.button}> <AiOutlineDelete className={styles.icon} /> </Button>

                    <Button variant=
                        {status === 'INCOMPLETE' ? 'outline-secondary' : 'success'}
                        onClick={handleStatus} className={styles.button}
                    >
                        <AiOutlineCheck className={styles.icon} />
                    </Button>
                </div>
            </ListGroup.Item>

        </div>
    )
}

export default TodoCard
import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import TodoCard from '../TodoCard/TodoCard'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import styles from './TodoList.module.css'
import { createTodo } from '../../redux/actions'



function TodoList() {
    const { id } = useParams()
    const folders = useSelector(state => state.folders)
    const todos = useSelector(state => state.todos)
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormValue = {
        title: '',
        description: '',
        folderId: id,
        userId: profile.id
    }

    const [formValue, setFormValue] = useState(initialFormValue)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        e.preventDefault()
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    let actualFolder = folders?.filter(f => f.id === Number(id))
    let actualTodos = todos.filter(todo => todo.folderId === Number(id))

    const handleAddToDo = (e) => {
        e.preventDefault()
        if (formValue.title === '') {
            setError('To-do title is required')
            return;
        }
        if (formValue.description === '') {
            setError('To-do description is required')
            return;
        } else {
            handleClose()
            dispatch(createTodo(formValue))
            setFormValue(initialFormValue)
        }
    }

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.route}>
                    <Link to='/' className={styles.link}>
                        Profile &nbsp;
                    </Link>
                    {`> ${actualFolder[0]?.folderName}`}</h2>
                <Button variant="dark" onClick={handleShow}>
                    Add new to do
                </Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
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
                            <Form.Text className="text-muted">
                                {
                                    error === 'To-do title is required' ? error : null
                                }
                            </Form.Text>

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
                            <Form.Text className="text-muted">
                                {
                                    error === 'To-do description is required' ? error : null
                                }
                            </Form.Text>

                        </Form.Group>
                        <div className={styles.buttonContainer}>
                            <Button variant="dark" size="lg" className={styles.button} type='submit'>
                                Add to-do
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            {
                actualTodos?.map(task =>
                    <ListGroup as="ol" numbered>
                        <TodoCard
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            created={task.createdAt}
                            status={task.todoStatus}
                        />
                    </ListGroup>
                )
            }
        </div>
    )
}

export default TodoList
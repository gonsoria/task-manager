import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import styles from '../../styles/Styles.module.css'
import { createUser } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import AccountCreated from '../AccountCreated/AccountCreated'


function Register() {
    const dispatch = useDispatch()
    const accountCreated = useSelector(state => state.accountCreated)

    const initialUserData = {
        email: '',
        password: ''
    }

    const [userData, setUserData] = useState(initialUserData)

    const handleChange = (e) => {
        e.preventDefault()
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createUser(userData))
    }

    return (
        <Container className={styles.container} >
            {
                accountCreated ? <AccountCreated /> :
                    <div>
                        <h2 className={styles.title}>Sign up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className={styles.textContainer} controlId="formBasicEmail">
                                <Form.Label >Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}

                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className={styles.textContainer} controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name='password'
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button variant="dark" size="lg" className={styles.button} type='submit'>
                                Create account
                            </Button>
                        </Form>
                    </div>

            }
        </Container>

    )
}

export default Register
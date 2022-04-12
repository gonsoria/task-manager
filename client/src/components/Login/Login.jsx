import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import styles from '../../styles/Styles.module.css'
import { logIn } from '../../redux/actions'
import { Link } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.isAuthenticated)


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

    const handleLogIn = (e) => {
        e.preventDefault()
        dispatch(logIn(userData))
        if (isAuthenticated) {
            setUserData(initialUserData)
        }
    }


    return (
        <Container className={styles.container}>
            <h2 className={styles.title}>Log in</h2>
            <Form onSubmit={handleLogIn}>
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
                        placeholder="Password"
                        name='password'
                        value={userData.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="dark" size="lg" className={styles.button} type='submit'>
                    Continue
                </Button>
                <Form.Text>
                    Or
                </Form.Text>
                <br />
                <Form.Text>
                    <Link to='/register'>
                        Create an account.
                    </Link>
                </Form.Text>
            </Form>
        </Container>
    )
}

export default Login
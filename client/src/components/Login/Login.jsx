import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/Styles.module.css'
import { logIn } from '../../redux/actions'
import { Link } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const accountStatus = useSelector(state => state.accountStatus)

    const initialUserData = {
        email: '',
        password: ''
    }

    const [loading, setLoading] = useState(false)

    //FORM CONTROL
    const [userData, setUserData] = useState(initialUserData)
    const [error, setError] = useState(null)


    const handleChange = (e) => {
        e.preventDefault()
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }


    const handleLogIn = (e) => {
        e.preventDefault()
        if (userData.email.trim() === '') {
            setError('Email is required')
            return;
        }
        if (userData.password.trim() === '') {
            setError('Password is required')
            return;
        }
        else {
            setError(null)
            dispatch(logIn(userData))
            setLoading(true)
            if (accountStatus === 'success') {
                setLoading(false)
            }
            // setUserData(initialUserData)
        }
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Log into your account</h2>
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
                        {
                            error === 'Email is required' ? error : accountStatus === "Cannot find user" ? accountStatus : null
                        }
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
                    <Form.Text className="text-muted">
                        {
                            error === 'Password is required' ? error : accountStatus === 'failed' ? 'Password incorrect' : null
                        }
                    </Form.Text>

                </Form.Group>

                <Button variant="dark" size="lg" className={styles.button} type='submit'>
                    {
                        !loading ? 'Continue' :
                            < Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                    }
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
        </div>
    )
}

export default Login
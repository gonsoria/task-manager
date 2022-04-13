import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './AccountCreated.module.css'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom'
import { logOut } from '../../redux/actions'

function AccountCreated() {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(logOut())
    }

    return (
        <div>

            <Alert variant="success">
                <Alert.Heading>
                    <h1 className={styles.title} > Account created!</h1>
                </Alert.Heading>
                <hr />
                <h4 className="mb-0">
                    <Link to='/' onClick={handleClick}>
                        <span>
                            Log in
                        </span>
                    </Link>
                    &nbsp; to start using the app.
                </h4>
            </Alert>
        </div>
    )
}

export default AccountCreated
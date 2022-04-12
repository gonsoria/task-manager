import React, { useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import styles from '../../styles/Styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import { logOut } from '../../redux/actions'

function NavBar() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.isAuthenticated)

    const handleLogOut = () => {
        dispatch(logOut())
    }
    useEffect(() => { }, [isAuthenticated])
    return (
        <Navbar bg="dark" variant="dark">
            <div className={styles.navBar}>
                <Link to='/'>
                    <Navbar.Brand className={styles.navTitle}>
                        Todo App
                    </Navbar.Brand>
                </Link>
                <Button variant="dark" onClick={handleLogOut} className={isAuthenticated ? `${styles.logout}` : `${styles.hide}`}>
                    Log out
                </Button>
            </div>
        </Navbar>
    )
}

export default NavBar
import React from 'react'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

function AccountCreated() {
    return (
        <div>

            <Container>
                <h1> Account created!</h1>
                <h3>
                    <Link to='/'>
                        <span>
                            Log in
                        </span>
                    </Link>
                    to start using the app.
                </h3>
            </Container>
        </div>
    )
}

export default AccountCreated
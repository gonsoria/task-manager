import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileData } from '../../redux/actions'

function Profile() {
    const profileData = useSelector(state => state.profile)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileData(profileData.email))
    })

    return (
        <div>
            <h2>{profileData.email}</h2>
            <div>
                {
                    profileData.folder?.map((fold, i) => (
                        <div key={i}>
                            <Link to={'/folder/' + fold.id} >
                                <h3>{fold.folderName}</h3>
                            </Link>
                            <h4>Total todos: {fold.todo.length}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Profile
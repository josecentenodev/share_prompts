'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams()
    const username = searchParams.get('name')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`)
            const data = await response.json()
            setPosts(data)
        }
        if (params?.id) fetchPosts()
    }, [params.id])

    return (
        <Profile
            name={username}
            desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
        />
    )
}

export default UserProfile

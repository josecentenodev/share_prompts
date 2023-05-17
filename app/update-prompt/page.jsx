'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Form from '@components/Form'

const UpdatePrompt = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    const params = useSearchParams()
    const promptId = params.get('id')

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/prompt/${promptId}/`)
            const data = await response.json()
            setPost(data)
        }
        console.log(promptId)
        fetchPost()
    }, [])

    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!promptId) return alert('Missing prompt ID')
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log(err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt

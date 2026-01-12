"use client"
import { deletePost } from '@/lib/news'
import React from 'react'

export default function DeleteNewsButton({ id, ownerUsername, currentUser }) {
    const isEditor = currentUser?.role === 'admin' || currentUser?.role === 'editor'
    const canDelete = isEditor && (currentUser?.role === 'admin' || ownerUsername === currentUser?.username)
    if (!canDelete) return null

    async function handleDelete() {
        const confirmed = window.confirm('Are you sure you want to delete news?')
        if (!confirmed) return
        try {
            await deletePost(id)
            window.location.reload()
        } catch (err) {
            console.error(err)
            alert('Error deleting')
        }
    }

    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

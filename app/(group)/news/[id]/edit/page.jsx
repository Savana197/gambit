"use client"
import { editPost } from "@/lib/actions"
import { getNewsById } from "@/lib/news";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react"

export default function EditPage() {
    const router = useRouter()
    const { id } = useParams()
    const [state, formAction, pending] = useActionState(editPost, { message: null })
    const [news, setNews] = useState(null);
    useEffect(() => {
        async function getNews() {
            const post = await getNewsById(Number(id))
            setNews(post)
        }

        if (id) {
            getNews()
        }
    }, [id])
    useEffect(
    () => {
        if(state?.message==="Successfully updated post"){
            alert(state.message)
            router.push(`/news/${id}`)
        }
    }, [state]
    )
    if (!news) {
        return <p>Loading...</p>
    }
    return (

        <form className="p-5" action={formAction}>
            <input type="hidden" name="id" value={news.id} />
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" defaultValue={news.title} className="form-control" id="title" name="title" />

            </div>
            <div className="input-group">
                <span className="input-group-text">News Text</span>
                <textarea className="form-control" aria-label="With textarea" name="content" defaultValue={news.content}></textarea>
            </div>
            {news.image && (
                <div className="mb-3">
                    <p>Current image:</p>
                    <img
                        src={news.image}
                        alt="Current image"
                        style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                </div>
            )}
            <input
                type="hidden"
                name="existingImage"
                value={news.image || ""}
            />
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Choose Different Image If You Want</label>
                <input type="file" accept="image/*" className="form-control" id="image" name="image" />
            </div>
            <button disabled={pending} type="submit" className="btn btn-secondary">{pending ? 'Saving changes...' : 'Save changes'}</button>
            {state.message && <p>{state.message}</p>}
        </form>
    )
}
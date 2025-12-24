'use client'
import { postNews } from "@/lib/actions"
import { useActionState } from "react"


export default function PostNews() {
    const [state, formAction] = useActionState(postNews, {message:null})
    return (
        <form className="p-5" action={formAction}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" />

            </div>
            <div className="input-group">
                <span className="input-group-text">News Text</span>
                <textarea className="form-control" aria-label="With textarea" name="content"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Choose Image</label>
                 <input type="file" accept="image/*" className="form-control" id="image" name="image" />
            </div>
            <button type="submit" className="btn btn-secondary">Submit</button>
             {state.message && <p>{state.message}</p>}
        </form>
       
    )
}
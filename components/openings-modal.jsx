'use client'
import { addOpening } from "@/lib/actions"
import { verifySession } from "@/lib/auth"
import { fetchUserWithId } from "@/lib/users"

import { useActionState, useEffect, useState } from "react"

export default function OpeningModal() {
    const [state, formAction] = useActionState(addOpening, { message: '', success: false })
    const [user, setUser] = useState(null)
    // useEffect(() => {
    //     if(!state.success) return;
    //     const modalEl = document.getElementById("modal");
    //     if (!modalEl || !window.bootstrap) return;
    //     const modal = window.bootstrap.Modal.getInstance(modalEl)
    //     modal.dispose()
    //     router.refresh()
    // },[state.success])
    useEffect(() => {
        async function getUser() {
            const { userId } = await verifySession()
            const user = await fetchUserWithId(userId)
            setUser(user)
        }
        getUser()
    }, [])
    return (
        <>
            {user?.role==="admin" && <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal">
                Add Opening
            </button>}

            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalLabel">Add chess opening details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="p-5" action={formAction}>
                                <input type="hidden" value={user?.id || ""} name="authorid"/>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Opening name</label>
                                    <input type="text" className="form-control" id="opening" name="opening" required />

                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Description</span>
                                    <textarea className="form-control" aria-label="With textarea" name="description" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Add image</label>
                                    <input type="file" accept="image/*" className="form-control" id="image" name="image" />
                                </div>
                                <button type="submit" className="btn btn-secondary">Submit</button>
                                {state?.message && <p>{state.message}</p>}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
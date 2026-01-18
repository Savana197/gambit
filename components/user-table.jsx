"use client"
import { Role } from "@/generated/prisma/enums";
import { getUsers, patchUser } from "@/lib/users"
import { useEffect, useState } from "react";

export default function UserTable() {
    const[users, setUsers] = useState(null);
    useEffect(() => {
        async function fetchUsers(){
            const data = await getUsers();
            setUsers(data);
        }
        fetchUsers()
    },[])
    return (
        <div className="m-3 p-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <select
                                    className="form-select"
                                    aria-label="Select role"
                                    defaultValue={user.role}
                                    onChange={e => patchUser(user.id, e.target.value)}
                                >
                                    <option value={Role.USER}>USER</option>
                                    <option value={Role.EDITOR}>EDITOR</option>
                                </select>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        </div>
    )
}
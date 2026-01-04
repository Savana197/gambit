
export async function getUsers() {
    const result = await fetch("http://localhost:3000/api/users/admin", { cache: "no-store" })
    if (!result.ok) throw new Error("Failed to fetch users");
    return result.json();
}
export async function patchUser(userId, role) {
    try {
        const result = await fetch("http://localhost:3000/api/users/admin",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    role
                })

            }


        )
        if (result.status === 500) {
            alert("Failed to change role!")
        }

    } catch (error) {
        console.error("Couldnt update user!")
    }

}
export async function fetchUserWithId(userId) {
    if (!userId) return;
    try {
        const res = await fetch(`http://localhost:3000/api/users/check?userId=${userId}`,  { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        return data
    } catch (err) {
        console.error(err);
        return null
    }
}
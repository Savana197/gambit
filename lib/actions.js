"use server"
import { redirect } from "next/navigation";
import { uploadImage } from "./cloudinary";
import { refresh, revalidatePath } from "next/cache";
import { LoginFormSchema, RegisterFormSchema } from "./definitions";
import { createSession, deleteSession, getUserFromCookie } from "./auth";

export async function login(prevState, formData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    const validation = LoginFormSchema.safeParse(data)
    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors
        }
    }
    const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    })
    const result = await res.json();
    if (!result.success) {
        return {
            message: "User with this email or password doesnt exist!"
        }
    }
    await createSession(result.user.id, false)
    return { success: true }


}
export async function register(prevState, formData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    }
    const validation = RegisterFormSchema.safeParse(data)
    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors
        }
    }
    const res = await fetch("http://localhost:3000/api/users/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            username: data.username
        })
    })
    const result = await res.json();
    if (result.exists) {
        return {
            errors: {
                email: ["User with this email or username already exists"]
            }
        }
    }
    const userUnparsed = await fetch('http://localhost:3000/api/users/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            username: data.username,
            password: data.password,
        })
    })
    const user = await userUnparsed.json()
    await createSession(user.id, false)

    return { success: true }

}
export async function postNews(prevState, formData) {
    const authorId = await getUserFromCookie();
    const data = {
        title: formData.get("title"),
        content: formData.get("content"),
        image: formData.get("image"),
        authorId
    }
    function isInvalidText(text) {
        return !text || text === ''
    }
    if (isInvalidText(data.title) || isInvalidText(data.content)) {
        return {
            message: "Invalid input"
        }
    }
    if (!data.image || data.image.size === 0) {
        return {
            message: "Must add an image!"
        }
    }
    let imageURL;
    try {
        imageURL = await uploadImage(data.image);
    } catch (error) {
        return {
            message: "Couldnt upload image, try again later"
        }
    }
    data.imageURL = imageURL;
    try {

        await fetch("http://localhost:3000/api/news", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        });
    } catch (error) {
        return {
            message: error.message || "Something went wrong"
        }
    }
    revalidatePath('/news')
    redirect('/news')

}
export async function addOpening(prevState, formData) {
    const data = {
        name: formData.get("opening"),
        description: formData.get("description"),
        image: formData.get("image"),
        authorid: 1
    }
    function isInvalidText(text) {
        return !text || text === ''
    }
    if (isInvalidText(data.name) || isInvalidText(data.description)) {
        return {
            message: "Invalid input"
        }
    }
    if (!data.image || data.image.size === 0) {
        return {
            message: "Invalid picture"
        }
    }
    let imageURL;
    try {
        imageURL = await uploadImage(data.image)
    } catch (error) {
        return { message: "Couldn't upload image. Try again later" }
    }
    data.imageURL = imageURL
    try {
        await fetch('http://localhost:3000/api/openings', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
    } catch (error) {
        return { message: "Couldnt upload opening" }
    }
    revalidatePath('/openings')
    return { message: "Succesfully added opening" }

}
export async function logout() {
    await deleteSession();
}
export async function comment(prevState, formData) {
    const content = formData.get("comment");
    if (!content || content === "") {
        return { message: "Comment must not be empty" }
    }
    const newsId = formData.get("newsId")
    const userId = await getUserFromCookie();
    if (!userId) {
        return { message: "You must be logged in to comment" }
    }
    try {
        await fetch("http://localhost:3000/api/comments", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                content,
                newsId,
                userId
            })
        });
    } catch (error) {
        return {
            message: error.message || "Something went wrong"
        }

    }
    refresh()

}

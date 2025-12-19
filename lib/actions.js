import { redirect } from "next/navigation";


export default async function postNews(prevState, formData) {
    const data = {
        title: formData.get("title"),
        content: formData.get("content"),
    }
    function isInvalidText(text) {
        return !text || text === ''
    }
    if (isInvalidText(data.title) || isInvalidText(data.content)) {
        return {
            message: "Invalid input"
        }
    }
    try {

        await fetch("/api/news", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        });
    } catch (error) {
        return {
            message: error
        }
    }
    redirect('/news')

}
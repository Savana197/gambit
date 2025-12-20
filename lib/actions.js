"use server"
import { redirect } from "next/navigation";
import { uploadImage } from "./cloudinary";
import { revalidatePath } from "next/cache";


export async function postNews(prevState, formData) {
    const data = {
        title: formData.get("title"),
        content: formData.get("content"),
        image: formData.get("image")
    }
    function isInvalidText(text) {
        return !text || text === ''
    }
    if (isInvalidText(data.title) || isInvalidText(data.content)) {
        return {
            message: "Invalid input"
        }
    }
    if(!data.image || data.image.size===0){
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
export async function getNews(){
    try {
        const res = await fetch('http://localhost:3000/api/news',{
            cache : 'no-store'
        })
        if(!res.ok){
            throw new Error("Failed to fetch news");
            
        }
        return await res.json();
        
    } catch (error) {
        console.error(error);
        return [];
        
    }
}
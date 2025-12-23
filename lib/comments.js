

export default async function getComments(postId){
    const url = `http://localhost:3000/api/comments?id=${postId}`
    try {
        const result =await fetch(url, {
            cache: 'no-store'
        }
        )
        if(!result.ok){
            throw new Error("Can't fetch comments");
            
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        return []
    }
}
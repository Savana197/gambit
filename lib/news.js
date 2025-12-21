export async function getNews(limit){
    let url = 'http://localhost:3000/api/news'
    if(limit){
        url+=`?limit=${limit}`
    }
    try {
        const res = await fetch(url,{
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

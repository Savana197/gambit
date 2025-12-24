export async function getOpenings(limit){
    let url = 'http://localhost:3000/api/openings'
    if(limit){
        url+=`?limit=${limit}`
    }
    try {
        const res = await fetch(url, {cache:'no-store'})
        if(!res.ok){
            throw new Error('Failed to fetch openings')
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        return []
    }
}
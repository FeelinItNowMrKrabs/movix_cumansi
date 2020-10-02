export default async function getTopMovies(url){
    const res = await fetch(`http://localhost/${url}`)
    const data = res.json()
    return data
}

export async function makeRequest(url){
    const res = await fetch(`http://localhost/${url}`)
    const data = res.json()
    return data
}
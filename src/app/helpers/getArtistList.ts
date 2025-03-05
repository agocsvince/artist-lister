const ARTIST_LIST_URL = "https://exam.api.fotex.net/api/artists?include_image=true&page=1&per_page=50"

export default async function getArtistList() {
  try {
    const response = await fetch(ARTIST_LIST_URL)
    const json = await response.json()
    const { data, pagination } = json

    if (!response.ok) {
      console.error(`An error occured: ${json.message}`)
      return
    }
  
    return data
  } catch (error) {
    console.error(error)
  }
}
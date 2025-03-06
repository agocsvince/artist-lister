const ARTIST_LIST_URL = "https://exam.api.fotex.net/api/artists?include_image=true&per_page=50"

export default async function getArtistList(page: number) {
  try {
    const response = await fetch(`${ARTIST_LIST_URL}&page=${page}`)
    const json = await response.json()
    const { data, pagination } = json

    if (!response.ok) {
      console.error(`An error occured: ${json.message}`)
      return
    }
  
    return { data, pagination }
  } catch (error) {
    console.error(error)
  }
}
const ARTIST_LIST_URL = "https://exam.api.fotex.net/api/artists?include_image=true&per_page=50"

export default async function getArtistList(page: number) {
  try {
    const response = await fetch(`${ARTIST_LIST_URL}&page=${page}`);

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const json = await response.json()
    const { data, pagination } = json

    return { data, pagination }
  } catch (error) {
    console.error(error)

    return { data: []}
  }
}
import getArtistList from "./getArtistList";

const mockUserData = { data: [{
  "id": 690,
  "name": "100 Folk Celsius",
  "albumCount": 23,
  "portrait": "https://picsum.photos/seed/690/491/544"
},
{
  "id": 1035,
  "name": "100 Tagú Cigányzenekar",
  "albumCount": 8,
  "portrait": "https://picsum.photos/seed/1035/477/463"
},
{
  "id": 6054,
  "name": "13 + 1 Zenekar",
  "albumCount": 1,
  "portrait": "https://picsum.photos/seed/6054/535/511"
}], pagination: {
  "current_page": 1,
  "total_pages": 228,
  "per_page": 50,
  "total_items": 11382
}};
const mockedResponseProps = {
  headers: new Headers(),
  redirected: false,
  status: 200,
  ok: true,
  statusText: "OK",
  type: "basic",
  url: "",
  clone: jest.fn(),
  body: null,
  bodyUsed: false,
  arrayBuffer: jest.fn(),
  blob: jest.fn(),
  formData: jest.fn(),
  text: jest.fn(),
  bytes: () => Promise.resolve(new Uint8Array()),
  json: () => Promise.resolve(mockUserData),
}

describe("Get artist list", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  test('get artist list by page number', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ...mockedResponseProps
      } as Response)
    );
      
    const result = await getArtistList(1);

    expect(result).toEqual(mockUserData);
  });
  
  test('fetch page 1 when no page number is given', async () => {
    await getArtistList();

    expect(fetch).toHaveBeenCalledWith('https://exam.api.fotex.net/api/artists?include_image=true&per_page=50&page=1')
    });
})
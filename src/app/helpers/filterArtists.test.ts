import filterArtists from "./filterArtists";

describe("Filter Artist list by filter model", () => {
  test('filterArtists filters correctly', () => {
    const mockedArtists = [
      {
          "id": 8735,
          "name": "A Rockszínház Társulata",
          "albumCount": 1,
          "portrait": "https://picsum.photos/seed/8735/500/500"
      },
      {
          "id": 12606,
          "name": "Arpinus",
          "albumCount": 1,
          "portrait": "https://picsum.photos/seed/12606/500/500"
      },
      {
          "id": 1680,
          "name": "Ars Nova Énekegyüttes",
          "albumCount": 4,
          "portrait": "https://picsum.photos/seed/1680/500/500"
      }
    ];
    const mockedFilter = {
      items: [
        {
          field: 'albumCount',
          operator: "equals",
          value: "4"
        }
      ]
    }

    const result = filterArtists(mockedArtists, mockedFilter);
    
    const expectedResult = [{
      "id": 1680,
      "name": "Ars Nova Énekegyüttes",
      "albumCount": 4,
      "portrait": "https://picsum.photos/seed/1680/500/500"
    }];

    expect(result).toEqual(expectedResult);
  });

  test('filterArtists filters correctly', () => {
    const mockedArtists = [
      {
          "id": 8735,
          "name": "A Rockszínház Társulata",
          "albumCount": 1,
          "portrait": "https://picsum.photos/seed/8735/500/500"
      },
      {
          "id": 12606,
          "name": "Arpinus",
          "albumCount": 1,
          "portrait": "https://picsum.photos/seed/12606/500/500"
      },
      {
          "id": 1680,
          "name": "Ars Nova Énekegyüttes",
          "albumCount": 4,
          "portrait": "https://picsum.photos/seed/1680/500/500"
      }
    ];
    const mockedFilter = {
      items: [
        {
          field: 'albumCount',
          operator: "equals",
          value: "4"
        }
      ]
    }

    const result = filterArtists(mockedArtists, mockedFilter);
    
    const expectedResult = [{
      "id": 1680,
      "name": "Ars Nova Énekegyüttes",
      "albumCount": 4,
      "portrait": "https://picsum.photos/seed/1680/500/500"
    }];

    expect(result).toEqual(expectedResult);
  });
})

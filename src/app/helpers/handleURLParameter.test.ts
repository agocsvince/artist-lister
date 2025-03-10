import { getFilterModelFromURL, updateURLParams } from './handleURLParameter';

describe("URL search parameters into filter model", () => {
    test('returns all parameters from URL', () => {
        Object.defineProperty(window, 'location', {
            value: {
                search: '?filter=2&field=albumCount&operator=equals'
            },
            writable: true
        });
    
        const result = getFilterModelFromURL();
        expect(result).toEqual({ value: "2", field: 'albumCount', operator: 'equals'});
    });
    
    test('returns empty strings object if no parameters in the URL', () => {
        Object.defineProperty(window, 'location', {
            value: {
                search: '?'
            },
            writable: true
        });
    
        const result = getFilterModelFromURL();
        expect(result).toEqual({ value: "", field: '', operator: ''});
    });
})


describe("URL search parameter handling with filters", () => {
    let pushStateSpy: jest.SpyInstance;

    beforeEach(() => {
      window.history.pushState({}, '', '/');
      pushStateSpy = jest.spyOn(window.history, 'pushState');
    });
  
    afterEach(() => {
      pushStateSpy.mockRestore();
    });

    test('calls pushState with the correct url', () => {
        updateURLParams({items: [ { value: "2", field: 'albumCount', operator: 'equals'}]}, 1);
    
        const expectedURL = '?filter=2&field=albumCount&operator=equals&page=1';
        // expect(pushStateSpy).toBe(expectedURL);
        expect(pushStateSpy).toHaveBeenCalledWith(null, '', expectedURL);
    });


    test('calls pushState with an empty url', () => {
        updateURLParams({items: []}, 1);
    
        const expectedURL = '?page=1';
        // expect(pushStateSpy).toBe(expectedURL);
        expect(pushStateSpy).toHaveBeenCalledWith(null, '', expectedURL);
    });
})




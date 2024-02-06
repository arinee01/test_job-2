import axios, { AxiosError, AxiosResponse } from 'axios';
import { getCurrentGeo, Geo, CurrentGeoType } from './index'; 

jest.mock('axios');

describe('getCurrentGeo function', () => {
  it('fetches successfully', async () => {
    
    const mockData: CurrentGeoType = {
      data: [
        {
          country: 'Country',
          lat: 123,
          local_names: { ru: 'Name' },
          lon: 456,
          name: 'City',
          state: 'State'
        }
      ]
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(mockData);


    let result: Geo[] | null = null;
    getCurrentGeo('Moscow', (data) => {
      result = data;
    });

 
    expect(result).toEqual(mockData.data);
  });

  it('handles errors', async () => {
   
    const errorMessage = 'Error message';
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error(errorMessage));

    
    let result: Geo[] | null = null;
    getCurrentGeo('Moscow', (data) => {
      result = data;
    });

  
    expect(result).toBeNull();
  });
});

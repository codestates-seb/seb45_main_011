import axios, { AxiosResponse } from 'axios';

import { RawGardenInfo } from '@/types/data';

// findGardensByUserIdWith(And ...Id) -> 스프링 영향이 큼, 국제적 표준
export const fetchGardenData = async () => {
  const data = await axios.get(`13.209.96.203/v1/gardens/1`);

  return data;
};

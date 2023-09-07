import axios from 'axios';

import { PlantLocation } from '@/types/data';

export const gardenAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOjEsImRpc3BsYXlOYW1lIjoi6rSA66as7J6QIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sInVzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwic3ViIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjk0MTAxMDI0LCJleHAiOjE2OTQxMDI4MjR9.Nxkrubl08WGqcbokj7WkA9wVIEMd8DX-uyxzLLburHM',
  },
  withCredentials: true,
});

export const findGardenByUserId = async (userId: string) => {
  const { data } = await gardenAxios
    .get(`/gardens/${userId}`)
    .then((res) => res.data);

  return data;
};

export const purchasePlant = async (userId: string, productId: number) => {
  const { data } = await gardenAxios
    .post(`/gardens/${userId}/purchase?product-id=${productId}`)
    .then((res) => res.data);

  return data;
};

export const saveGarden = async (
  userId: string,
  plantLocations: PlantLocation[],
) => {
  const { data } = await gardenAxios
    .patch(`/gardens/${userId}/location`, plantLocations)
    .then((res) => res.data);

  return data;
};

export const findLeaves = async () => {
  const { data } = await gardenAxios.get(`/leaves`).then((res) => res.data);

  return data;
};

export const connectLeaf = async (
  userId: string,
  plantObjId: number,
  leafId: number | null,
) => {
  const { data } = await gardenAxios
    .patch(
      `/gardens/${userId}/connection?plantobj-id=${plantObjId}${
        leafId ? `&leaf-id=${leafId}` : ''
      }`,
    )
    .then((res) => res.data);

  return data;
};

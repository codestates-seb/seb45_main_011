import { client } from './base';

import { PlantLocation } from '@/types/data';

export const findGardenByUserId = async (userId: string) => {
  const { data } = await client
    .get(`/gardens/${userId}`)
    .then((res) => res.data);

  return data;
};

export const purchasePlant = async (userId: string, productId: number) => {
  const { data } = await client
    .post(`/gardens/${userId}/purchase?product-id=${productId}`)
    .then((res) => res.data);

  return data;
};

export const saveGarden = async (
  userId: string,
  plantLocations: PlantLocation[],
) => {
  const { data } = await client
    .patch(`/gardens/${userId}/location`, plantLocations)
    .then((res) => res.data);

  return data;
};

export const findLeaves = async () => {
  const { data } = await client.get(`/leaves`).then((res) => res.data);

  return data;
};

export const connectLeaf = async (
  userId: string,
  plantObjId: number,
  leafId: string | null,
) => {
  const { data } = await client
    .patch(
      `/gardens/${userId}/connection?plantobj-id=${plantObjId}${
        leafId ? `&leaf-id=${leafId}` : ''
      }`,
    )
    .then((res) => res.data);

  return data;
};

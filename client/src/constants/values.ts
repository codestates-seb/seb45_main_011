export const CONTROLLER_DIRECTIONS = ['up', 'right', 'down', 'left'] as const;

export const blockedLocations = [
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 1, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 6, y: 2 },
  { x: 7, y: 2 },
  { x: 4, y: 3 },
  { x: 7, y: 3 },
  { x: 4, y: 4 },
  { x: 7, y: 4 },
  { x: 4, y: 5 },
  { x: 5, y: 5 },
  { x: 6, y: 5 },
  { x: 7, y: 5 },
  { x: 0, y: 7 },
  { x: 1, y: 7 },
  { x: 3, y: 7 },
  { x: 10, y: 6 },
  { x: 11, y: 6 },
];

export const SQAURE_QUANTITY = 96;

export const GARDEN_MAP_COLUMNS = 12;

export const MOUNT_ANIMATION_VALUES = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_ID;

export const SHARE_URL = 'https://growstory.vercel.app';

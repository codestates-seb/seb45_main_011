export const getPlantSize = (name: string) =>
  name.startsWith('building') ? 'lg' : 'sm';

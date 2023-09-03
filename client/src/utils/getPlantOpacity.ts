export const getPlantOpacity = (isEditMode: boolean, isClicked: boolean) => {
  if (!isEditMode) return 'opacity-100';

  return isClicked ? 'opacity-100' : 'opacity-60';
};

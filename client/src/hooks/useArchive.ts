import useGardenStore from '@/stores/gardenStore';

const useArchive = () => {
  const { inventory, plants, setInventory, setPlants } = useGardenStore();

  const handleArchive = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLElement) {
      const targetId = event.target.closest('div')?.dataset.plantId;
      const targetPlant = plants.find(
        ({ plantObjId }) => plantObjId === Number(targetId),
      );

      if (targetPlant) {
        const {
          productId,
          plantObjId,
          productName,
          korName,
          imageUrlTable,
          price,
        } = targetPlant;

        const newItem = {
          productId,
          plantObjId,
          name: productName,
          korName,
          imageUrlTable,
          price,
        };
        const newPlants = plants.map((plant) =>
          plant.plantObjId === Number(targetId)
            ? {
                ...plant,
                location: {
                  ...plant.location,
                  isInstalled: false,
                },
              }
            : plant,
        );

        setInventory([...inventory, newItem]);
        setPlants(newPlants);
      }
    }
  };

  return { handleArchive };
};

export default useArchive;

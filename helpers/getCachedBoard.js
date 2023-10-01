const { cache } = require("../cache");

const getCachedBoard = async (substr, taskCard) => {
  const cachedKeys = cache.keys();
  const filteredKeys = cachedKeys.filter((cacheKey) =>
    cacheKey.includes(substr)
  );
  const getBoardId = async (filteredKeys) => {
    for await (const key of filteredKeys) {
      const { cards, columns } = await cache.get(key);

      if (cards.length === 0 || !cards) {
        const foundColumn = columns.some(
          (column) => taskCard.cardOwner.toString() === column._id.toString()
        );
        if (foundColumn) return key;
      }

      const foundCard = cards.some(
        (card) => card.cardOwner.toString() === taskCard.cardOwner.toString()
      );
      if (!foundCard) continue;
      return key;
    }
  };
  return await getBoardId(filteredKeys);
};

module.exports = getCachedBoard;

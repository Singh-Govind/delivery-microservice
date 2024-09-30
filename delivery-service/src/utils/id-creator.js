const createId = (name, categoriesCount) => {
  return name.split("").slice(0, 3).join("").toUpperCase() + "_" + categoriesCount;
};

module.exports = createId;

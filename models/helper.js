const transform = (removeProperties) => {
  const tObject = {
    transform: (document, returnedObject) => {
      const transformedObject = {
        ...returnedObject,
        id: returnedObject._id.toString(),
      };

      delete transformedObject._id;
      delete transformedObject.__v;
      if (removeProperties) {
        removeProperties.forEach((property) => {
          delete transformedObject[property];
        });
      }
      return transformedObject;
    },
  };

  return tObject;
};

module.exports = {
  transform,
};

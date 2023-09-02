const transformId = {
  transform: (document, returnedObject) => {
    const transformedObject = {
      ...returnedObject,
      id: returnedObject._id.toString()
    }

    delete transformedObject._id
    delete transformedObject.__v
    return transformedObject
  }
}

module.exports = {
  transformId
}

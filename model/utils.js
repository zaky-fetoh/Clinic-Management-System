exports.checkifRefExist = async function (model, searchValue) {
  const doc = await model.findOne(
    {
      _id: searchValue,
    },
    { projection: { _id: 1 } }
  );
  return Boolean(doc);
};

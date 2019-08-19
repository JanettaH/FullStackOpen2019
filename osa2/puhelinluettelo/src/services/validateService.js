const validatePerseon = (name, number) => {
  if (name == null || name === "") {
    return false;
  } else if (number == null || number === "") {
    return false;
  }
  return true;
};

export default { validatePerseon };

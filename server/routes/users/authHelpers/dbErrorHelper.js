const getUniqueErrorMessage = (err) => {
  try {
    let errorMessage = err.message;

    errorMessage = `User, ${errorMessage.slice(
      errorMessage.indexOf("{") + 13,
      errorMessage.indexOf("}") - 2
    )} already exists`;
    return errorMessage;
  } catch (error) {}
};

const getErrorMessage = (err) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "something went wrong";
    }
  } else if (err.message) {
    return err.message;
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  return message;
};

module.exports = getErrorMessage;

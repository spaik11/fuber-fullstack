const getUniqueErrorMessage = (err) => {
  let output;

  try {
    let fieldName = err.message.substring(
      err.message.lastIndexOf(".$") + 2,
      err.message.lastIndexOf("_1")
    );

    let whereToSlice = fieldName.lastIndexOf(":") + 2;

    output = fieldName.slice(whereToSlice) + " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};

const getErrorMessage = (err) => {
  let message = "";

  if (err.code) {
    switch (err.code) {
      case 11000:
        message = getUniqueErrorMessage(err);
        break;
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went wrong";
    }
  } else if (err.message) {
    message = err.message;
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  console.log("ERR MSG ", message);
  return message;
};

module.exports = getErrorMessage;

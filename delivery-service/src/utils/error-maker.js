const throwError = (errMessage, errName, errStatus) => {
    error = new Error(errMessage);
    error.name = errName;
    error.status = errStatus;
    throw error;
};

module.exports = { throwError };

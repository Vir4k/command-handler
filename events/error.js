/**
  * @param {*} _
  * @param {Error} error
  */
module.exports = (_, error) => {
  if (error.code === 1006) return;
  else console.error(error);
};

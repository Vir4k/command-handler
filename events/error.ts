export = async (client, error) => {
  if (error.code === 1006) return;
  else console.error(error);
};

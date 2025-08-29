const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const generateId = () => {
  return `notes-${+new Date()}`;
};

export { showFormattedDate, generateId };

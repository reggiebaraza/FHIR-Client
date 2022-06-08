export default (val) => {
  // Check for null values before formating date
  const date = new Date(val);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

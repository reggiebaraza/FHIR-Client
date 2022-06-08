export default (val) => {
  // Check for null values before formating date
  if (val == null) return "N/A";
  if (val.length < 1) return "N/A";

  return val["text"];
};

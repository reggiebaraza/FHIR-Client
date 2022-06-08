export default (val) => {
  // Check for null values before formating date
  if (val == null) return "N/A";
  if (val.length < 1) return "N/A";

  const addressObject = val.find((el) => el.address !== null);
  if (!addressObject) return "N/A";
  if (!addressObject["address"]["line"]) return "N/A";

  return addressObject["address"]["line"].join(" ");
};

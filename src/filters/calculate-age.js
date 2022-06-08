export default (val) => {
  // Check for null values before formating date
  if (val == null) return "N/A";
  if (!val.length || val.length < 5) return "N/A";

  const birthyear = parseInt(val.split("-")[0]);
  const currentYear = new Date(Date.now()).getFullYear();

  return currentYear - birthyear;
};

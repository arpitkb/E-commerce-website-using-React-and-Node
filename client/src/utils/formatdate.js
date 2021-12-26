function formatDate(date) {
  let res = new Intl.DateTimeFormat().format(new Date(date));
  res = res.split("/").join("-");
  return res;
}

export default formatDate;

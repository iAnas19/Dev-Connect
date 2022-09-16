function formatDate(date) {
  return new Intl.DateTimeFormat('en-PK').format(new Date(date));
}

export default formatDate;

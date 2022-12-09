function getDaysInMonth(num){
  let now = new Date()
  let date = new Date(now.getFullYear(), +num + 1, 0);
  return date.getDate();
}

export default getDaysInMonth;
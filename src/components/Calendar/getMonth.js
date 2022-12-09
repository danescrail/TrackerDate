function getMonth(num) {
  if (+num === 0) {
    return <span>Январь</span>
  } else if (+num === 1) {
    return <span>Февраль</span>
  } else if (+num === 2) {
    return <span>Март</span>
  } else if (+num === 3) {
    return <span>Апрель</span>
  } else if (+num === 4) {
    return <span>Май</span>
  } else if (+num === 5) {
    return <span>Июнь</span>
  } else if (+num === 6) {
    return <span>Июль</span>
  } else if (+num === 7) {
    return <span>Август</span>
  } else if (+num === 8) {
    return <span>Сентябрь</span>
  } else if (+num === 9) {
    return <span>Октябрь</span>
  } else if (+num === 10) {
    return <span>Ноябрь</span>
  } else if (+num === 11) {
    return <span>Декабрь</span>
  }
}

export default getMonth;


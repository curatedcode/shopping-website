
function getDate(){
  const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const date = new Date()
  const day = daysOfWeek[date.getDay()]
  const month = months[date.getMonth()]
  return `${day}, ${month} ${date.getDate()}`
}

export default getDate
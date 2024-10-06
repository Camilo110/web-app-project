
export function daysToYearsandMonths(days) {
  const years = Math.floor(days / 365)
  const months = Math.floor((days % 365) / 30)
  const daysLeft = Math.floor((days % 365) % 30)

  let result = ''
  if (years > 0) {
    result += `${years} años`
  }
  if (months > 0) {
    result += `${result.length > 0 ? ' y ' : ''}${months} meses`
  }
  if (years <= 0 && months <= 0) {
    result += `${daysLeft} días`
  }
  return result
}
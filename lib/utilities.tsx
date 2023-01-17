import moment from 'moment';


export const showExperience = (until) => {

  const today = new moment();
  const past = new Date(until);
  var a = moment.duration(today.diff(past))
  const experienceYears = a.asYears();


  return(
    experienceYears > 1 ? `(${Math.floor(experienceYears)} years)` : '(less than 1 year)'
  )


}

export const debounce = function (func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
          clearTimeout(timeoutId)
      }  
      timeoutId = setTimeout(function (){
        func(...args);
      },delay);
    };
}
  
export const msToDate = function(duration) {
    return new Date(duration);
}
  
export const getTime = function(date) {
    let now = date; 
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let session = 'AM';
  
    if(hour === 0){
        hour = 12;
    }
    if(hour > 12){
        hour = hour - 12;
        session = "PM";
     }
  
     hour = (hour < 10) ? '0' + hour : hour;
     minute = (minute < 10) ? '0' + minute : minute;
     second = (second < 10) ? '0' + second : second;
      
     return hour + ":" + minute + ":" + second + " " + session ;
} 

export const getDate = function(date) {
    const str = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    return str.replaceAll(',','');
}

export const getDay = function(date) {
 return date.toLocaleDateString('en-us', {day:"numeric"});
}

export const getWeekday = function(date) {
  return date.toLocaleDateString('en-us', {weekday:"long"});
}

export const getMonth  = function(date) {
 const monthNames = ["January", "Febuary", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"];

  const month = date.getMonth();
  return monthNames[month];
} 

export const updateDateAndTime = function() {
        let now = new Date();   
        document.querySelector('.current-date').textContent = getTime(now);
        document.querySelector('.current-time').textContent = getDate(now); 
        setTimeout(function(){
         updateDateAndTime();
        },1000);
}







/**
   * Force a function to wait a certain amount of time before executing again.
   * @function debounce
   * @param {function} func function which will be executed after certain time.
   * @param {Number} delay time will be set in setTimeout function.
   * @returns {function name(...args) {
     Timeout 
   }} 
*/
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
  
/**
   * Get miliseconds and converts it to date.
   * @function msToDate
   * @param {Number} duration in miliseconds
   * @returns {Date} format : Date Time
*/
export const msToDate = function(duration) {
    return new Date(duration);
}
  
/**
   * Change Date Object to time format.
   * @function getTime
   * @param {Object} date Date instance
   * @returns {String} time format
*/
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

/**
   * Change Date Object to date(day,Month,Year) format.
   * @function getDate
   * @param {Object} date Date instance
   * @returns {String} date(day,Month,Year) format
*/
export const getDate = function(date) {
    const str = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    return str.replaceAll(',','');
}

/**
   * Get day of Month.(1,2,3,...)
   * @function getDay
   * @param {Object} date Date instance
   * @returns {String} day format
*/
export const getDay = function(date) {
 return date.toLocaleDateString('en-us', {day:"numeric"});
}

/**
   * Get weekday (sunday,monday,...)
   * @function getWeekday
   * @param {Object} date Date instance
   * @returns {String} weekday
*/
export const getWeekday = function(date) {
  return date.toLocaleDateString('en-us', {weekday:"long"});
}

/**
   * Get Month (february,january,...)
   * @function getMonth
   * @param {Object} date Date instance
   * @returns {String} month
*/
export const getMonth  = function(date) {
 const monthNames = ["January", "Febuary", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"];

  const month = date.getMonth();
  return monthNames[month];
} 

/** 
   * Update date and time in header
   * @function updateDateAndTime
   * @returns {undefined}
*/
export const updateDateAndTime = function() {
        let now = new Date();   
        document.querySelector('.current-date').textContent = getTime(now);
        document.querySelector('.current-time').textContent = getDate(now); 
        setTimeout(function(){
         updateDateAndTime();
        },1000);
}







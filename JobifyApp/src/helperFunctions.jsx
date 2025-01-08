import { formatDistanceToNow } from 'date-fns';

function formatDate(dateString, format = "MMM DD, YYYY") {
    const date = new Date(dateString);
  
    // Define month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Extract day, month, and year
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    // Format based on the given format string
    switch (format) {
      case "MMM DD, YYYY":
        return `${month} ${day}, ${year}`;
      case "DD, MMM, YYYY":
        return `${day}, ${month}, ${year}`;
      default:
        return `${month} ${day}, ${year}`; // Default format
    }
  }
  

const timeAgo = (dateString) => {
  const date = new Date(dateString); // Convert the date string into a Date object
  return formatDistanceToNow(date, { addSuffix: true });
}
  
const isEmpty = (value) => 
  value === null || value === "" || (typeof value === "object" && !Object.keys(value || {}).length);


export {
    formatDate,
    isEmpty,
    timeAgo
}
export const getCurrentDate = () => {
    // Create a new Date object and set the timezone to IST (India Standard Time)
    const today = new Date();
  
    // Extract date components
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero if needed
    const day = String(today.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
  
    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
}
  
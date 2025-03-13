
import { TestDates } from "./useResultsDataLoader";

export const useDateHelpers = (testDates: TestDates) => {
  const getMostRecentTestDate = () => {
    if (Object.keys(testDates).length === 0) {
      return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    const dates = Object.values(testDates).map(dateStr => new Date(dateStr));
    const mostRecent = new Date(Math.max(...dates.map(date => date.getTime())));
    
    return mostRecent.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return {
    getMostRecentTestDate
  };
};

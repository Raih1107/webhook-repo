import { parse, format } from 'date-fns';

/**
 * Formats the timestamp to match the specific requirement:
 * "{Day} {Month} {Year} - {Time} {AM/PM} UTC"
 */
export const getRelativeTime = (timestamp) => {
  if (!timestamp) return "";
  
  try {
    // 1. Clean the string for parsing
    const cleanDate = timestamp.replace(' UTC', '');
    
    // 2. Parse the existing DB format: "22 February 2026 - 05:47 PM"
    const date = parse(cleanDate, "dd MMMM yyyy - hh:mm aa", new Date());
    
    // 3. Reformat to the exact sample style: "22nd February 2026 - 05:47 PM UTC"
    // 'do' provides the ordinal (st, nd, rd, th) required by the sample
    return format(date, "do MMMM yyyy - hh:mm aa") + " UTC";

  } catch (err) {
    // Fallback to the raw string from MongoDB if parsing fails
    return timestamp;
  }
};
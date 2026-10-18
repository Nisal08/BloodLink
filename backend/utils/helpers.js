/**
 * Generate a random color from a predefined palette
 */
export const getColor = (index) => {
  const colors = ['#FF0040', '#7B2FFF', '#00B4FF', '#00E5A0', '#FF7B00'];
  return colors[index % colors.length];
};

/**
 * Build pagination metadata
 */
export const paginate = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

/**
 * Blood demand calculation based on open requests vs available donors
 */
export const calculateDemandLevel = (openRequests, availableDonors) => {
  const ratio = availableDonors > 0 ? openRequests / availableDonors : openRequests;
  if (ratio > 2) return 'Critical';
  if (ratio > 1) return 'High';
  if (ratio > 0.5) return 'Medium';
  return 'Low';
};
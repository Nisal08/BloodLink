// Blood type compatibility mapping
export const BLOOD_COMPAT = {
  'O-':  { canDonateTo: ['A+','A-','B+','B-','AB+','AB-','O+','O-'], canReceiveFrom: ['O-'] },
  'O+':  { canDonateTo: ['A+','B+','AB+','O+'],                      canReceiveFrom: ['O+','O-'] },
  'A-':  { canDonateTo: ['A+','A-','AB+','AB-'],                      canReceiveFrom: ['A-','O-'] },
  'A+':  { canDonateTo: ['A+','AB+'],                                  canReceiveFrom: ['A+','A-','O+','O-'] },
  'B-':  { canDonateTo: ['B+','B-','AB+','AB-'],                      canReceiveFrom: ['B-','O-'] },
  'B+':  { canDonateTo: ['B+','AB+'],                                  canReceiveFrom: ['B+','B-','O+','O-'] },
  'AB-': { canDonateTo: ['AB+','AB-'],                                 canReceiveFrom: ['A-','B-','O-','AB-'] },
  'AB+': { canDonateTo: ['AB+'],                                       canReceiveFrom: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
};

/**
 * Get blood types that a donor can donate to
 */
export const canDonateTo = (donorBloodType) => {
  return BLOOD_COMPAT[donorBloodType]?.canDonateTo || [];
};

/**
 * Get blood types that can donate to a recipient
 */
export const canReceiveFrom = (recipientBloodType) => {
  return BLOOD_COMPAT[recipientBloodType]?.canReceiveFrom || [];
};

/**
 * Check if a donor is compatible with a recipient
 */
export const isCompatible = (donorBloodType, recipientBloodType) => {
  return canDonateTo(donorBloodType).includes(recipientBloodType);
};

/**
 * Get all compatible donor blood types for a given recipient blood type
 */
export const getCompatibleDonors = (recipientBloodType) => {
  return canReceiveFrom(recipientBloodType);
};
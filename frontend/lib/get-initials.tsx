export const getInitials = (fullName: string): string => {
  const nameParts = fullName
    .trim()
    .split(' ')
    .filter(part => part);
  const initials = nameParts.map(part => part[0].toUpperCase()).join('');
  return initials;
};

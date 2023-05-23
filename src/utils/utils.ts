export const maskEmail = (email: string) => {
  const atIndex = email.indexOf('@');
  if (atIndex >= 0) {
    const username = email.slice(0, atIndex);
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 1);
    return maskedUsername + email.slice(atIndex);
  }
  return email;
};
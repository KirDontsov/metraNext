/**
 * Функция валидации телефона
 */
export const validateAndReformatPhone = (phone: string): string => {
  const pattern = RegExp("[^\\d]", "g");
  return phone.replace(pattern, "");
};

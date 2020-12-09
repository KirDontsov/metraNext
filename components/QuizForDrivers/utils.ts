/**
 * Функция валидации телефона
 */
export const validateAndReformatPhone = (phone: string) => {
  const pattern = RegExp("[^\\d]", "g");
  return phone.replace(pattern, "");
};

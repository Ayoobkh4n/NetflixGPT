export const validation = (email, password) => {
  const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const passCheck =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])\S{8,20}$/.test(
      password
    );
  if (!emailCheck) return "Email Valid alladey";
  if (!passCheck) return "Password valid allatta";

  return null;
};

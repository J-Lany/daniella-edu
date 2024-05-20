export class UserDTO {
  constructor({ userId, email, login, firstName, lastName }) {
    this.userId = userId;
    this.email = email;
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export function convertToDTO(user) {
  return new UserDTO(user);
}

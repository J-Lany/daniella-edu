export class UserDTO {
  constructor(user) {
    this.userId = user.userId;
    this.email = user.email;
    this.login = user.login;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }

  static convertToDTO(user) {
    return new UserDTO(user);
  }
}

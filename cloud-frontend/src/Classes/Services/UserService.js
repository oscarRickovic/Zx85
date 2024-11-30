import User from "../Entities/User";
import { UserServiceEnum } from "../Enums/UserServiceEnum";
import DataChecker from "../Helpers/DataChecker";

export default class UserService {
  static checkUserData( user) {
    if (! (user instanceof User)) return UserServiceEnum.NO_USER_INSTANCE;
    if (! DataChecker.isEmailValid(user.email)) return UserServiceEnum.EMAIL_ERROR;
    if (! DataChecker.isPasswordValid(user.password)) return UserServiceEnum.PASSWOR_ERROR;
    if (! DataChecker.isPasswordsMatch(user.password, user.repeatedPassword)) return UserServiceEnum.REPEATED_PASSWORD_ERROR;
    return UserServiceEnum.OK;
  }    
}
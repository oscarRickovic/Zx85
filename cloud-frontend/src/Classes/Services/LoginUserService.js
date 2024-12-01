// src/Services/LoginUserService.js
import LoginUser from "../Entities/LoginUser";
import { LoginUserServiceEnum } from "../Enums/LoginUserServiceEnums";
import DataChecker from "../Helpers/DataChecker";

export default class LoginUserService {
  static checkLoginUserData(loginUser) {
    // Check if loginUser is an instance of LoginUser
    if (!(loginUser instanceof LoginUser)) return LoginUserServiceEnum.NO_USER_INSTANCE;
    if (!DataChecker.isEmailValid(loginUser.email)) return LoginUserServiceEnum.EMAIL_ERROR;
    if (!DataChecker.isPasswordValid(loginUser.password)) return LoginUserServiceEnum.PASSWORD_ERROR;
    return LoginUserServiceEnum.OK;
  }
}

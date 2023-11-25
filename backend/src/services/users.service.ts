import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  // public async findAllUser(): Promise<User[]> {
  //   const users: User[] = await this.users.find();
  //   return users;
  // }

  public async findUserByEmail(email: string): Promise<User> {
    if (isEmpty(email)) throw new HttpException(400, "Invaild email-id.");

    const findUser: User = await this.users.findOne({ email });
    if (!findUser) throw new HttpException(409, "User not found.");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "Invalid user data");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const createUserData: User = await this.users.create(userData);

    return createUserData;
  }

  // public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   if (userData.email) {
  //     const findUser: User = await this.users.findOne({ email: userData.email });
  //     if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
  //   }

  //   if (userData.password) {
  //     const hashedPassword = await hash(userData.password, 10);
  //     userData = { ...userData, password: hashedPassword };
  //   }

  //   const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
  //   if (!updateUserById) throw new HttpException(409, "You're not user");

  //   return updateUserById;
  // }

  // public async deleteUser(userId: string): Promise<User> {
  //   const deleteUserById: User = await this.users.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, "You're not user");

  //   return deleteUserById;
  // }
}

export default UserService;

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { SigninDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';
import { User } from './models/users.models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  public async signup(signupDTO: SignupDTO): Promise<User> {
    const user = new this.usersModel(signupDTO);
    return user.save();
  }

  public async signin(signinDTO: SigninDTO): Promise<{
    name: string;
    jwtToken: string;
    email: string;
  }> {
    const user = await this.findByEmail(signinDTO.email);
    const match = await this.checkPassword(signinDTO.password, user);

    if (!match) {
      throw new NotFoundException('Invalid credentials');
    }

    const jwtToken = await this.authService.createAccessToken(user._id);

    return {
      name: user.name,
      jwtToken,
      email: user.email,
    };
  }

  public async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Email not found.');
    }

    return user;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new NotFoundException('Password not found.');
    }

    return match;
  }
}

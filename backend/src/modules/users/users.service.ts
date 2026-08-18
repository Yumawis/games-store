import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashingService } from '../../common/services/hashing.service';
import { User, UserDocument } from './schemas/user.schema';

export interface UserView {
  _id: string;
  names: string;
  lastNames: string;
  email: string;
  createdAt: Date;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly hashing: HashingService,
  ) {}

  static toView(user: UserDocument): UserView {
    return {
      _id: user._id.toString(),
      names: user.names,
      lastNames: user.lastNames,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async existsByEmail(email: string): Promise<boolean> {
    return (await this.userModel.exists({ email })) !== null;
  }

  async create(input: {
    names: string;
    lastNames: string;
    email: string;
    password: string;
  }): Promise<UserDocument> {
    const hashed = await this.hashing.hash(input.password);
    return this.userModel.create({ ...input, password: hashed });
  }
}

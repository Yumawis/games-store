import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashingService } from '../../common/services/hashing.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, HashingService],
  exports: [UsersService, HashingService, MongooseModule],
})
export class UsersModule {}

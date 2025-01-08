import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReporitory } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserReporitory) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findUserByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('This user Already exists');
    }
    return await this.userRepository.createUser(createUserDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  delete(id: number) {
    return this.userRepository.remove(id);
  }
}

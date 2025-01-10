import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReporitory } from './repositories/user.repository';
import { NotFoundError } from 'src/common/Errors/types/NotFoundError';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserReporitory) {}
  async create(createUserDto: CreateUserDto) {
    // const user = await this.userRepository.findUserByEmail(createUserDto.email);
    // if (user) {
    //   throw new ConflictException('This user Already exists');
    // }
    return await this.userRepository.createUser(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const userExists = await this.userRepository.findOne(id);

    if(!userExists){
      throw new NotFoundError('Usuário não encontrado')
    }

    return await this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  delete(id: number) {
    return this.userRepository.remove(id);
  }
}

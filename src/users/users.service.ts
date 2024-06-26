import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userInDB = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });
    if (userInDB) throw new ConflictException('user already exists');

    const hashedPassword = await this.hashPassword(createUserDto.password);
    let user = this.usersRepository.create(createUserDto);
    user = { ...user, password: hashedPassword };
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete({ id });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
  }
}

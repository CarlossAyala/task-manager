import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // return "This action adds a new user";
    return this.repository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    // return `This action returns all user`;
    return this.repository.find();
  }

  findOne(id: number): Promise<User | null> {
    // return `This action returns a #${id} user`;
    return this.repository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    // return `This action removes a #${id} user`;
    await this.repository.delete(id);
  }
}

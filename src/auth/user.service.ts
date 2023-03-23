import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findByFields(options: FindOneOptions<UserDTO>): Promise<User | undefined> {
        return this.userRepository.findOne(options);
    }

    async transformPassword(user: UserDTO): Promise<void> {
        user.password = await bcrypt.hash(
            user.password, 10,
        );
        return Promise.resolve();
    }

    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        await this.transformPassword(userDTO);
        return this.userRepository.save(userDTO);
    }
}
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({ where: { username: newUser.username } });
        if (userFind) {
            throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
        }

        return this.userService.save(newUser);
    }

    async validateUser(user: UserDTO): Promise<{ accessToken: string } | undefined> {
        let userFind: User = await this.userService.findByFields({
            where: { username: user.username }
        })
        const validatePassword = await bcrypt.compare(user.password, userFind.password);

        if (!userFind || !validatePassword) {
            throw new UnauthorizedException();
        }

        const payload: Payload = { id: userFind.id, username: userFind.username };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}

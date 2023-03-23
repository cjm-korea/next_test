import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 13306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'next_test',
      autoLoadEntities: true,
      // something is wrong
      // entities: [__dirname + '/**/*.entity.{js,ts}'],
      // set absolute path is well operation
      // entities: [User],
      synchronize: true,
    };
  }
}
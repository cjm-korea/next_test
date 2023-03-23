import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { env } from 'process';

// function ormConfig(): TypeOrmModuleOptions {
// 	const commonConf = {
//         SYNCRONIZE: true,
//         ENTITIES: [__dirname + '/entities/*.entity{.ts,.js}'],
//         MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
//         CLI: {
//             migrationsDir: 'src/migrations',
//         },
//         MIGRATIONS_RUN: false,
//     };

//     const ormconfig: TypeOrmModuleOptions = {
//         name: 'default',
//         type: 'mysql',
//         database: 'next_test',
//         host: 'localhost',
//         port: 3306,
//         username: 'root',
//         password: '**choi2350',
//         logging: true,
//         // for dev mode
//         synchronize: commonConf.SYNCRONIZE,
//         entities: commonConf.ENTITIES,
//         migrations: commonConf.MIGRATIONS,
//         migrationsRun: commonConf.MIGRATIONS_RUN,
//     };
    
//     return ormconfig;
// }

// export { ormConfig };

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'next_test',
      autoLoadEntities: true,
    //   something is wrong
    //   entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
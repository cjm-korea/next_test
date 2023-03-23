import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
	const commonConf = {
        SYNCRONIZE: true,
        ENTITIES: [__dirname + '/entities/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: false,
    };

    const ormconfig: TypeOrmModuleOptions = {
        name: 'default',
        type: 'mysql',
        database: 'next_test',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        logging: true,
        // for dev mode
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
    
    return ormconfig;
}

export { ormConfig };
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EEnv } from 'src/common/constants/env.enum';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createTypeOrmOptions(configService),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      const pendingMigrations = await this.dataSource.showMigrations();
      if (pendingMigrations) {
        console.log('Running pending migrations...');
        await this.dataSource.runMigrations();
        console.log('Migrations completed successfully');
      }
    } catch (error) {
      console.error('Error checking/running migrations', error);
    }
  }
}

function createTypeOrmOptions(configService: ConfigService): DataSourceOptions {
  return {
    type: configService.get<any>(EEnv.DB_TYPE),
    host: configService.get(EEnv.DB_HOST),
    port: +configService.get(EEnv.DB_PORT),
    username: configService.get(EEnv.DB_USERNAME),
    password: configService.get(EEnv.DB_PASSWORD),
    database: configService.get<string>(EEnv.DB_NAME),
    synchronize: false,
    entities: [__dirname + '/entities/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
  };
}

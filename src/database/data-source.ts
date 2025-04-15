import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { EEnv } from 'src/common/constants/env.enum';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: '.env.local' });

const configService = new ConfigService();

console.log(__dirname + './entities/*.entity.{ts,js}');

export const dataSourceOptions: DataSourceOptions = {
  type: configService.get<any>(EEnv.DB_TYPE),
  host: configService.get(EEnv.DB_HOST),
  port: +configService.get(EEnv.DB_PORT),
  username: configService.get(EEnv.DB_USERNAME),
  password: configService.get(EEnv.DB_PASSWORD),
  database: configService.get<string>(EEnv.DB_NAME),
  synchronize: true,
  entities: [__dirname + '/entities/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

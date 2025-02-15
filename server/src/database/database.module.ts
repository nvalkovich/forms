import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodeEnv, envVariables } from 'src/types/types';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProd =
          configService.get<string>(envVariables.nodeEnv) === NodeEnv.prod;

        return {
          type: 'postgres',
          url: configService.get<string>(envVariables.databaseUrl),
          autoLoadEntities: true,
          synchronize: !isProd,
          migrationsRun: isProd,
          migrations: [
            path.resolve(process.cwd(), 'src/migrations/*{.ts,.js}'),
          ],
        };
      },
    }),
  ],
})
export class DatabaseModule {}

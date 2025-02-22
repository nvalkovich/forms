import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodeEnv, envVariables } from 'src/types/types';
import { Initial1740274162586 } from 'src/migrations/1740274162586-Initial';

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
          synchronize: false,
          migrations: [Initial1740274162586],
          migrationsRun: true,
          logging: true
        };
      },
    }),
  ],
})
export class DatabaseModule {}

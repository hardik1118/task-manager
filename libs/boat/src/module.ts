import { Global, Module } from '@nestjs/common';
import config from '@config/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import { BaseValidator, IsValueFromConfigConstraint } from './validator';

import { AppConfig } from './utils';
import { ConsoleExplorer, ListCommands } from './console';
import { ObjectionModule } from '@libs/database';
import pg from 'pg';

pg.types.setTypeParser(20, (val) => parseInt(val));
@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AppConfig,
    BaseValidator,
    ConsoleExplorer,
    IsValueFromConfigConstraint,
    ListCommands
  ],
  exports: [BaseValidator],
})
export class BoatModule { }

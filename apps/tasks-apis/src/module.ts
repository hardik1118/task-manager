import { BoatModule } from '@libs/boat';
import { TaskLibModule } from '@libs/task-lib';
import { Module } from '@nestjs/common';
import { TasksController } from './controller';
import { TasksService } from './service';

@Module({
  imports: [
    BoatModule,
    TaskLibModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class AppModule { }

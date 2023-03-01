import { Module } from '@nestjs/common';
import { TaskLibConstant } from './constants';
import { EditHistoryRepository, TaskRepository } from './repositories';
import { TaskLibService } from './service';

@Module({
  providers: [
    TaskLibService,
    { provide: TaskLibConstant.TASK_REPO, useClass: TaskRepository },
    {
      provide: TaskLibConstant.EDIT_HISTORY_REPO,
      useClass: EditHistoryRepository,
    },
  ],
  exports: [TaskLibService],
})
export class TaskLibModule { }

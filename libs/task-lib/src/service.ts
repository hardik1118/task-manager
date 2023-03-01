import { Inject, Injectable } from '@nestjs/common';
import { TaskLibConstant } from './constants';
import { EditHistoryRepositoryContract, TaskRepositoryContract } from './repositories';

@Injectable()
export class TaskLibService {
    constructor(
        @Inject(TaskLibConstant.TASK_REPO)
        public readonly taskRepo: TaskRepositoryContract,
        @Inject(TaskLibConstant.EDIT_HISTORY_REPO)
        public readonly editHistoryRepo: EditHistoryRepositoryContract,
    ) { }
}

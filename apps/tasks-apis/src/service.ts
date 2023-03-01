import { AppConfig, ValidationFailed } from '@libs/boat';
import { ITaskModel } from '@libs/common';
import { Pagination } from '@libs/database';
import { TaskLibService } from '@libs/task-lib';
import { Injectable } from '@nestjs/common';
import { throwIfEmpty } from 'rxjs';
import { createTaskDto, getEditHistoryDto, listTaskDto, updateTaskDto } from './validator';

@Injectable()
export class TasksService {
  constructor(private readonly service: TaskLibService) { }

  async listTasks(inputs: listTaskDto): Promise<Pagination<ITaskModel>> {
    const data = await this.service.taskRepo.search(inputs);
    return data;
  }

  async createTask(inputs: createTaskDto) {
    const { title, endDate, status } = inputs;
    const settingsConfig = await AppConfig.get('settings')
    const task = await this.service.taskRepo.create({ title, status, endDate });

    await this.service.editHistoryRepo.create({ taskId: task.id, type: settingsConfig.editType.status, value: String(status) });
    await this.service.editHistoryRepo.create({ taskId: task.id, type: settingsConfig.editType.date, value: String(endDate) });
  }

  async updateTask(inputs: updateTaskDto) {
    const settingsConfig = await AppConfig.get('settings')
    const { id, status, endDate } = inputs;

    if (!status && !endDate) {
      return;
    }

    const payload = {};
    let editType: number;
    if (status) {
      editType = settingsConfig.editType.status;
      payload['status'] = status;
      await this.service.editHistoryRepo.create({ taskId: id, type: editType, value: String(status) });
    }

    if (endDate) {
      editType = settingsConfig.editType.date;
      payload['endDate'] = endDate;
      await this.service.editHistoryRepo.create({ taskId: id, type: editType, value: String(endDate) });
    }

    await this.service.taskRepo.updateWhere({ id }, payload);
  }

  async getEditHistory(inputs: getEditHistoryDto) {
    const { taskId } = inputs;
    return await this.service.editHistoryRepo.getWhere({ taskId });
  }
}

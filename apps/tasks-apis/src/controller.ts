import { Request, Response, RestController } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { EditHistoryTransformer, TaskTransformer } from '@libs/common/transformer';
import { Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { TasksService } from './service';
import { createTaskDto, getEditHistoryDto, listTaskDto, updateTaskDto } from './validator';

@Controller('tasks')
export class TasksController extends RestController {
  constructor(private readonly tasksService: TasksService) { super() }

  @Get()
  @Validate(listTaskDto)
  async listTasks(@Dto() dto: listTaskDto, @Req() req: Request, @Res() res: Response): Promise<Response> {
    const data = await this.tasksService.listTasks(dto);
    return res.withMeta(await this.paginate(data, new TaskTransformer(), { req }));
  }

  @Get(':taskId/history')
  @Validate(getEditHistoryDto)
  async getEditHistory(@Dto() dto: getEditHistoryDto, @Req() req: Request, @Res() res: Response): Promise<Response> {
    const data = await this.tasksService.getEditHistory(dto);
    return res.success(data);
  }

  @Post()
  @Validate(createTaskDto)
  async create(@Dto() dto: createTaskDto, @Req() req: Request, @Res() res: Response): Promise<Response> {
    await this.tasksService.createTask(dto);
    return res.success({ message: 'Task added successfully!' });
  }

  @Patch(':id')
  @Validate(updateTaskDto)
  async update(@Dto() dto: updateTaskDto, @Req() req: Request, @Res() res: Response): Promise<Response> {
    await this.tasksService.updateTask(dto);
    return res.success({ message: 'Task updated successfully!' });
  }
}

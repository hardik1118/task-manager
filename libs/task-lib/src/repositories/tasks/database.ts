import { ITaskModel, ITaskSearchModel } from "@libs/common";
import { DatabaseRepository, InjectModel, Pagination } from "@libs/database"
import { TaskModel } from "@libs/task-lib/models";
import { get } from "lodash";
import { TaskRepositoryContract } from "./contract";

export class TaskRepository extends DatabaseRepository<ITaskModel> implements TaskRepositoryContract {
    @InjectModel(TaskModel)
    model: TaskModel;

    search(inputs: ITaskSearchModel): Promise<Pagination<ITaskModel>> {
        const query = this.query();

        if (inputs.id) {
            query.where('id', inputs.id);
        }

        if (inputs.refId) {
            query.where('refId', inputs.refId);
        }

        if (inputs.title) {
            query.where('title', 'ilike', `${inputs.title}`);
        }

        if (inputs.status) {
            query.where('status', inputs.status);
        }

        query.cOrderBy('createdAt:desc');

        const result = get(inputs, 'paginate', false)
            ? query.paginate<ITaskModel>(inputs.page, inputs.perPage)
            : query.allPages<ITaskModel>();

        return result;
    }
}
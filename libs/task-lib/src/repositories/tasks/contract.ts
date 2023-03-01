import { ITaskModel, ITaskSearchModel } from '@libs/common';
import { Pagination, RepositoryContract } from '@libs/database';

export interface TaskRepositoryContract extends RepositoryContract<ITaskModel> {
    search(inputs: ITaskSearchModel): Promise<Pagination<ITaskModel>>;
}

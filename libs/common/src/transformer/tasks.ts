import { Transformer } from "@libs/boat";
import { ITaskModel } from "../interfaces";

export class TaskTransformer extends Transformer {
    async transform(model: ITaskModel): Promise<ITaskModel> {
        return {
            id: model?.id,
            title: model?.title,
            status: model?.status,
            endDate: model?.endDate,
            createdAt: model?.createdAt,
            updatedAt: model?.updatedAt
        }
    }
}


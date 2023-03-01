import { IEditHistoryModel, } from "@libs/common";
import { DatabaseRepository, InjectModel, } from "@libs/database"
import { EditHistoryModel } from "@libs/task-lib/models";
import { EditHistoryRepositoryContract } from "./contract";

export class EditHistoryRepository extends DatabaseRepository<IEditHistoryModel> implements EditHistoryRepositoryContract {
    @InjectModel(EditHistoryModel)
    model: EditHistoryModel;
}
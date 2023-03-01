import { Transformer } from "@libs/boat";
import { IEditHistoryModel } from "../interfaces";

export class EditHistoryTransformer extends Transformer {
    async transform(model: IEditHistoryModel): Promise<IEditHistoryModel> {
        return model;
    }
}


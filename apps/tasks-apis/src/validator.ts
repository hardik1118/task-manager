import { Exists, IsValueFromConfig } from "@libs/boat/validator";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";


export class createTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    endDate: Date;

    @IsNotEmpty()
    status: number;
}

export class updateTaskDto {
    @IsNotEmpty()
    @Exists({ table: 'tasks', column: 'id' })
    id: number;

    @ValidateIf((obj) => Boolean(obj.endDate))
    @IsOptional()
    @Transform(({ value }) => value && new Date(value) || null)
    @IsDate()
    endDate?: Date;

    @ValidateIf((obj) => Boolean(obj.status))
    @IsOptional()
    @ValidateIf((obj) => obj)
    @IsValueFromConfig({ key: 'settings.status' })
    status?: number;
}

export class listTaskDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    page: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    perPage: number;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    pagination: boolean;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    status: number;
}

export class getEditHistoryDto {
    @IsNotEmpty()
    @Exists({ table: 'tasks', column: 'id' })
    taskId: number;

    // @IsNotEmpty()
    // @Transform(({ value }) => parseInt(value))
    // type: number
}
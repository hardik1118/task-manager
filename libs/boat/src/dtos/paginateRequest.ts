import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { LoadRelSchema } from '../interfaces';

export class PaginateRequest {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  perPage = 15;

  eager: LoadRelSchema;
}

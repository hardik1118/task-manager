export interface ITaskModel {
  id?: number;
  refId?: string;
  title?: string;
  endDate?: Date;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskSearchModel {
  id?: number;
  refId?: string;
  title?: string;
  endDate?: Date;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
  page?: number;
  perPage?: number;
  pagination?: boolean;
}

export interface IEditHistoryModel {
  id?: number;
  taskId?: number;
  type?: number;
  value?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
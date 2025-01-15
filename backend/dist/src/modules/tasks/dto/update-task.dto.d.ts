import { CreateTaskDto } from './create-task.dto';
declare const UpdateTaskDto_base: import("@nestjs/mapped-types").MappedType<Omit<CreateTaskDto, "userId" | "title">>;
export declare class UpdateTaskDto extends UpdateTaskDto_base {
    title?: string;
}
export {};

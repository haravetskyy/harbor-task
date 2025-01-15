import { CreateProjectDto } from './create-project.dto';
declare const UpdateProjectDto_base: import("@nestjs/mapped-types").MappedType<Omit<CreateProjectDto, "userId">>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
}
export {};

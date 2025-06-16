import { BaseEntity } from './BaseEntity';
import { Person } from './Person';

export class Department extends BaseEntity {
	type = 'department';
	departmentId: number;
	name: string;
	departments: Department[];
	persons: Person[];

	constructor(
		departmentId: number,
		name: string,
		departments?: Department[],
		persons?: Person[]
	) {
		super();
		this.departmentId = departmentId;
		this.name = name;
		this.departments = departments ?? [];
		this.persons = persons ?? [];
	}

	getName(): string {
		return this.name;
	}
}

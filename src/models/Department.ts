import { BaseEntity, EntityType } from './BaseEntity';
import { Expanding } from './Expanding';
import { Person } from './Person';

export class Department extends BaseEntity implements Expanding {
	type = EntityType.DEPARTMENT;
	canBeExpanded = true;

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

	getId(): number {
		return this.departmentId;
	}

	getName(): string {
		return this.name;
	}

	hasChildren(): boolean {
		return this.departments.length > 0 || this.persons.length > 0;
	}
}

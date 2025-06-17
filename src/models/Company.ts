import { BaseEntity, EntityType } from './BaseEntity';
import { Department } from './Department';
import { Expanding } from './Expanding';
import { Person } from './Person';

export class Company extends BaseEntity implements Expanding {
	type = EntityType.COMPANY;
	canBeExpanded = true;

	companyId: number;
	name: string;
	departments: Department[];
	persons: Person[];

	constructor(
		companyId: number,
		name: string,
		departments?: Department[],
		persons?: Person[]
	) {
		super();
		this.companyId = companyId;
		this.name = name;
		this.departments = departments ?? [];
		this.persons = persons ?? [];
	}

	getId(): number {
		return this.companyId;
	}

	getName(): string {
		return this.name;
	}

	hasChildren(): boolean {
		return this.departments.length > 0 || this.persons.length > 0;
	}
}

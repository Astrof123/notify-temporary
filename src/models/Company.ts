import { BaseEntity } from './BaseEntity';
import { Department } from './Department';
import { Person } from './Person';

export class Company extends BaseEntity {
	type = 'company';
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

	getName(): string {
		return this.name;
	}
}

import { BaseEntity, ERecipientType } from './BaseEntity';
import { Expanding } from './Expanding';
import { Account } from './Account';

export class Department extends BaseEntity implements Expanding {
	type = ERecipientType.DEPARTMENT;
	canBeExpanded = true;

	departmentId: string;
	name: string;
	departments: Department[];
	accounts: Account[];

	constructor(
		departmentId: string,
		name: string,
		departments?: Department[],
		accounts?: Account[]
	) {
		super();
		this.departmentId = departmentId;
		this.name = name;
		this.departments = departments ?? [];
		this.accounts = accounts ?? [];
	}

	getId(): string {
		return this.departmentId;
	}

	getName(): string {
		return this.name;
	}

	hasChildren(): boolean {
		return this.departments.length > 0 || this.accounts.length > 0;
	}
}

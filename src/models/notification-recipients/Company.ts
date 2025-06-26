import { BaseEntity, ERecipientType } from './BaseEntity';
import { Department } from './Department';
import { Expanding } from './Expanding';
import { Account } from './Account';

export class Company extends BaseEntity implements Expanding {
	type = ERecipientType.COMPANY;
	canBeExpanded = true;

	companyId: string;
	name: string;
	departments: Department[];
	accounts: Account[];

	constructor(
		companyId: string,
		name: string,
		departments?: Department[],
		accounts?: Account[]
	) {
		super();
		this.companyId = companyId;
		this.name = name;
		this.departments = departments ?? [];
		this.accounts = accounts ?? [];
	}

	getId(): string {
		return this.companyId;
	}

	getName(): string {
		return this.name;
	}

	hasChildren(): boolean {
		return this.departments.length > 0 || this.accounts.length > 0;
	}
}

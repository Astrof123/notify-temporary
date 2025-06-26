import { BaseEntity, ERecipientType } from './BaseEntity';

export class Account extends BaseEntity {
	type = ERecipientType.ACCOUNT;
	canBeExpanded = false;

	accountId: string;
	firstName: string;
	middleName: string;
	lastName: string;

	constructor(
		accountId: string,
		firstName: string,
		middleName: string,
		lastName: string
	) {
		super();
		this.accountId = accountId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
	}

	getId(): string {
		return this.accountId;
	}

	getName(): string {
		return `${this.lastName} ${this.firstName} ${this.middleName}`;
	}

	hasChildren(): boolean {
		return false;
	}
}

export enum ERecipientType {
	COMPANY,
	DEPARTMENT,
	ACCOUNT,
}

export abstract class BaseEntity {
	chosen: boolean;
	abstract type: ERecipientType;
	abstract canBeExpanded: boolean;

	constructor() {
		this.chosen = false;
	}

	abstract getId(): string;

	abstract getName(): string;

	abstract hasChildren(): boolean;

	isCompany() {
		return this.type === ERecipientType.COMPANY;
	}

	isDepartment() {
		return this.type === ERecipientType.DEPARTMENT;
	}

	isPerson() {
		return this.type === ERecipientType.ACCOUNT;
	}
}

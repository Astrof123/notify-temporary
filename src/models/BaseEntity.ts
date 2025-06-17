export enum EntityType {
	COMPANY,
	DEPARTMENT,
	PERSON,
}

export abstract class BaseEntity {
	chosen: boolean;
	abstract type: EntityType;
	abstract canBeExpanded: boolean;

	constructor() {
		this.chosen = false;
	}

	abstract getId(): number;

	abstract getName(): string;

	abstract hasChildren(): boolean;

	isCompany() {
		return this.type === EntityType.COMPANY;
	}

	isDepartment() {
		return this.type === EntityType.DEPARTMENT;
	}

	isPerson() {
		return this.type === EntityType.PERSON;
	}
}

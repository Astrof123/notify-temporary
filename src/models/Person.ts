import { BaseEntity, EntityType } from './BaseEntity';

export class Person extends BaseEntity {
	type = EntityType.PERSON;
	canBeExpanded = false;

	personId: number;
	firstName: string;
	middleName: string;
	lastName: string;

	constructor(
		personId: number,
		firstName: string,
		middleName: string,
		lastName: string
	) {
		super();
		this.personId = personId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
	}

	getId(): number {
		return this.personId;
	}

	getName(): string {
		return `${this.lastName} ${this.firstName} ${this.middleName}`;
	}

	hasChildren(): boolean {
		return false;
	}
}

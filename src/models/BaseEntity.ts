export abstract class BaseEntity {
	abstract type: string;

	abstract getName(): string;

	isCompany() {
		return this.type === 'company';
	}

	isDepartment() {
		return this.type === 'department';
	}

	isPerson() {
		return this.type === 'person';
	}
}

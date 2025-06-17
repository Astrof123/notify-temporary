import { Person } from './Person';
import { Department } from './Department';

export interface Expanding {
	departments: Department[];
	persons: Person[];
}

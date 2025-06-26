import { Account } from './Account';
import { Department } from './Department';

export interface Expanding {
	departments: Department[];
	accounts: Account[];
}

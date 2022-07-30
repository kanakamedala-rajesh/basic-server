import { Address } from './Address.entity';
import { Company } from './Company.entity';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

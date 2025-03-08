import { Column } from '.';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

export const columns: Column<Person>[] = [
  {
    header: 'First Name',
    keyAccessor: 'firstName',
  },
  {
    header: 'Last Name',
    keyAccessor: 'lastName',
    render: (row) => <i>{row.lastName}</i>,
  },
  {
    header: 'Age',
    keyAccessor: 'age',
  },
  {
    header: 'Visits',
    keyAccessor: 'visits',
  },
  {
    header: 'Status',
    keyAccessor: 'status',
  },
  {
    header: 'Profile Progress',
    keyAccessor: 'progress',
  },
];

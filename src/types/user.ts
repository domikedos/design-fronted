export interface User {
  id: number;
  place: string;
  firstName: string;
  lastName: string;
  address: string;
  solved: number;
  avatar: string;
}

export interface UserListProps {
  users: User[];
  onSearch?: (query: string) => void;
} 
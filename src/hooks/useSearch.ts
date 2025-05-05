import { useState, useCallback } from 'react';
import { User } from '../types/user';

export const useSearch = (items: User[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item =>
    `${item.firstName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    searchQuery,
    handleSearch,
    filteredItems,
  };
}; 
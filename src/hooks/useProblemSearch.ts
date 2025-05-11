import { useState, useCallback, useMemo } from 'react';
import { Task } from '../api/types';

interface UseProblemSearchProps {
  problems: Task[];
}

interface UseProblemSearchReturn {
  searchQuery: string;
  difficultyFilter: string;
  handleSearch: (query: string) => void;
  handleDifficultyFilter: (difficulty: string) => void;
  filteredProblems: Task[];
}

export const useProblemSearch = ({ problems }: UseProblemSearchProps): UseProblemSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleDifficultyFilter = useCallback((difficulty: string) => {
    setDifficultyFilter(difficulty);
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [problems, searchQuery, difficultyFilter]);

  return {
    searchQuery,
    difficultyFilter,
    handleSearch,
    handleDifficultyFilter,
    filteredProblems,
  };
}; 
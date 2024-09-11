'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useCallback(
    debounce(async (searchQuery: string) => {
      try {
        const encodedQuery = encodeURIComponent(searchQuery);
        const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/search/bar?query=${encodedQuery}`);
        if (response.ok) {
          const data = await response.json();

          // Extract non-empty arrays
          const nonEmptyArrays = Object.values(data).filter(
            (item) => Array.isArray(item) && item.length > 0
          );

          // Flatten and map the suggestions
          const allSuggestions = nonEmptyArrays.flat().map((item: any) => {
            if (item.username) return item.username;
            if (item.name) return item.name;
            if (item.email) return item.email;
            return '';
          }).filter(Boolean);

          setSuggestions(allSuggestions);
        } else {
          console.error('Error fetching suggestions:', response.statusText);
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, fetchSuggestions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.search-bar')) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="search-bar position-relative" style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        backgroundColor: '#fff',
        padding: '8px 16px',
        border: '1px solid rgba(1,1,1,0.4)',
        boxShadow: 'none'
      }}>
        <input
          type="search"
          placeholder="Search anything..."
          value={query}
          onChange={handleChange}
          aria-label="Search"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'none',
            padding: '0',
            fontSize: '16px',
            width:'400px',
            color: '#333'
          }}
        />
        <FaSearch style={{ color: '#999', cursor: 'pointer' }} />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{zIndex:99}}  className="position-absolute w-100 mt-2 bg-white border border-secondary rounded shadow-sm list-unstyled">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid #dcdcdc'
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {!showSuggestions && query && (
        <ul style={{zIndex:99}} className="position-absolute w-100 mt-2 bg-white border border-secondary rounded shadow-sm list-unstyled">
          <li style={{ padding: '8px 16px', textAlign: 'center' }}>NO DATA FOUND</li>
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

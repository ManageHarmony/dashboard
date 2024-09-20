'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';
import { usePathname, useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa'; // Add spinner icon
import { Spinner } from 'react-bootstrap';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<{ name: string, id: string, role: string }[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [noDataFound, setNoDataFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({});
    const router = useRouter();
    const pathname = usePathname();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing.');
    }

    const fetchSuggestions = useCallback(
        debounce(async (searchQuery: string) => {
            setLoading(true);
            try {
                const encodedQuery = encodeURIComponent(searchQuery);
                const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/search/bar?query=${encodedQuery}`, {
                    method: "GET",
                    headers: {'x-api-key':apiKey}
                });
                if (response.ok) {
                    const data = await response.json();
                    setLoading(false); // Stop loading once data is fetched

                    // Extract suggestions from the response
                    const allSuggestions = [
                        ...(data.creator || []).map((item: any) => ({
                            name: item.username || item.email,
                            id: item.id,
                            role: 'creator',
                        })),
                        ...(data.manager || []).map((item: any) => ({
                            name: item.name || item.username,
                            id: item.id,
                            role: 'manager',
                        })),
                        ...(data.doctor || []).map((item: any) => ({
                            name: item.username,
                            id: item.id,
                            role: 'doctor',
                        })),
                    ].filter((item) => item.name);

                    setSuggestions(allSuggestions);
                    setNoDataFound(allSuggestions.length === 0);

                } else {
                    console.error('Error fetching suggestions:', response.statusText);
                    setSuggestions([]);
                    setNoDataFound(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
                setNoDataFound(true);
                setLoading(false);
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

    const handleSuggestionClick = (suggestion: { name: string, id: string, role: string }) => {
        setQuery(suggestion.name);
        setShowSuggestions(false); // Close suggestion box on click
        onSearch(suggestion.name);

        // Navigate based on the role
        switch (suggestion.role.toLowerCase()) {
            case 'creator':
                router.push(`/admin/staff/cards/${suggestion.id}?role=creator`);
                break;
            case 'manager':
                router.push(`/admin/staff/cards/${suggestion.id}?role=manager`);
                break;
            case 'doctor':
                router.push(`/admin/staff/cards/${suggestion.id}?role=doctor`);
                break;
            default:
                console.error('Unknown role:', suggestion.role);
                break;
        }
    };

    // Handle route changes to reset the search input and close suggestion box
    useEffect(() => {
        setQuery('');
        setShowSuggestions(false);
    }, [pathname]);

    const handleOutsideClick = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest('.search-bar')) {
            setShowSuggestions(false);
            if (noDataFound) {
                setNoDataFound(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [noDataFound]);

    const handleFocus = (field: string) => {
        setFocusState(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field: string) => {
        setFocusState(prev => ({ ...prev, [field]: false }));
    };

    return (
        <div className="search-bar position-relative" style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
            <div className="input-transition" style={{
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
                    className="input-transition"
                    onChange={handleChange}
                    aria-label="Search"
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        background: 'none',
                        padding: '0',
                        fontSize: '16px',
                        width: '400px',
                        color: '#333'
                    }}
                    onFocus={() => handleFocus('search')}
                    onBlur={() => handleBlur('search')}
                />
                <FaSearch className="icon-transition" style={{ color: focusState["search"] ? '#FFA05D' : '#999', cursor: 'pointer' }} />
            </div>


            {showSuggestions && (
                <ul style={{ zIndex: 99 }} className="position-absolute w-100 mt-2 bg-white border border-secondary rounded shadow-sm list-unstyled">
                    {loading ? (
                        <li className="text-center" style={{ padding: '8px 16px' }}>
                            <Spinner animation="border" /> {/* Display the spinner when loading */}
                        </li>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                style={{
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #dcdcdc'
                                }}
                            >
                                {suggestion.name}
                            </li>
                        ))
                    ) : (
                        noDataFound && (
                            <li className="text-center" style={{ padding: '8px 16px' }}>NO DATA FOUND</li>
                        )
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;

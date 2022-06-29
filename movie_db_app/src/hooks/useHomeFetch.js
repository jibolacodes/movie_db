import { useState, useEffect } from "react";
// API
import API from '../API'
// Helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // console.log(searchTerm);

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);

            setState(prev => ({
                ...movies,
                results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true)
        }
        setLoading(false)
    }

    // Initial render and Search
    useEffect(() => {
        // If we are searching do nothing else set a state in the sessionStorage
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');
            // If sessionStorage isn't null, then set the State of app to the data in sessionStorage
            if (sessionState) { 
                setState(sessionState);
                // Return to avoid also fetching from the API
                return;
            }
        }
        // Else
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm])

    // Load More Movies
    useEffect(() => {
        //if isLoadingMore is false then do nothing
        if (!isLoadingMore) return;
        // else
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page])

    // Write to sessionStorage
    useEffect(() => {
        if (!searchTerm) {
            return sessionStorage.setItem('homeState', JSON.stringify(state))
        };
    }, [searchTerm, state])

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore}
}
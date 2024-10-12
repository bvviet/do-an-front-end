// src/hooks/useCategories.ts
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchCategories } from '@/redux/slices/categorySlice';
import { AppDispatch, RootState } from '@/redux/store';

const useCategories = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return { categories, isLoading: loading, error };
};

export default useCategories;

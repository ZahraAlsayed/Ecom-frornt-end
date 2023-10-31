import { RootState } from './../redux/store';
import { useSelector } from 'react-redux';
import { Category } from './../redux/slices/products/categorySlice';
import { useState } from 'react'

const UseCategoryState =() => {
    const {items,
  error,
  isLoading,
  searchTerm } =useSelector(state:RootState)=> state.
}
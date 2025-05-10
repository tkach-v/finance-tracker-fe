'use client'

import React from 'react'
import Grid from '@mui/material/Grid'
import { useGetCategoriesQuery } from '@/api/extendedApi'
import CategoriesList from '@views/categories/CategoriesList'
import { CategoryTypes } from '@/types/categories'

const CategoriesPage = () => {
  const { data: categories } = useGetCategoriesQuery({})

  const incomeCategories = categories?.filter(cat => cat.type === 'income')
  const expenseCategories = categories?.filter(cat => cat.type === 'expense')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} mb={6}>
        <CategoriesList categories={incomeCategories} type={CategoryTypes.INCOME} />
      </Grid>
      <Grid item xs={12}>
        <CategoriesList categories={expenseCategories} type={CategoryTypes.EXPENSE} />
      </Grid>
    </Grid>
  )
}

export default CategoriesPage

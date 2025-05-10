'use client'

import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { useGetCategoriesQuery } from '@/api/extendedApi'
import CategoriesList from '@views/categories/CategoriesList'
import { CategoryTypes } from '@/types/categories'

const CategoriesPage = () => {
  const { data: categories } = useGetCategoriesQuery({})

  const incomeCategories = categories?.filter(cat => cat.type === 'income')
  const expenseCategories = categories?.filter(cat => cat.type === 'expense')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CategoriesList categories={incomeCategories} type={CategoryTypes.INCOME} />
      </Grid>
      <Grid item xs={12}>
        {categories?.map(cat => (
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <Card>
              <CardContent>
                <Box display='flex' alignItems='center' mb={2}>
                  <Typography variant='h6'>{cat.name}</Typography>
                </Box>
                <Chip
                  label={cat.type === 'income' ? 'Income' : 'Expense'}
                  size='small'
                  sx={{ backgroundColor: cat.type === 'income' ? '#C8E6C9' : '#FFCDD2' }}
                />
                <Box mt={2}>
                  <Typography variant='body2'>
                    Budget Limit: {cat.budget_limit !== null ? `$${cat.budget_limit}` : 'No limit'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default CategoriesPage

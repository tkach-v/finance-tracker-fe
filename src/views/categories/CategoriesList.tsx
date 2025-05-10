import React from 'react'
import { Category, CategoryTypes } from '@/types/categories'
import { Box, Stack, Typography } from '@mui/material'
import CategoryItem from '@views/categories/CategoryItem'
import AddCategoryButton from '@views/categories/AddCategory/AddCategoryButton'

type Props = {
  categories?: Category[]
  type: CategoryTypes
}

const CategoriesList = ({ categories, type }: Props) => {
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant={'h4'}>Категорії {type === CategoryTypes.INCOME ? 'доходів' : 'витрат'}</Typography>
        <AddCategoryButton type={type} />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        {categories?.map(category => <CategoryItem key={category.id} category={category} />)}
      </Box>
    </Box>
  )
}

export default CategoriesList

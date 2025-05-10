import React from 'react'
import { Category, CategoryTypes } from '@/types/categories'
import { Box, Stack, Typography, Divider } from '@mui/material'
import CategoryItem from '@views/categories/CategoryItem'
import AddCategoryButton from '@views/categories/AddCategoryButton'

type Props = {
  categories?: Category[]
  type: CategoryTypes
}

const CategoriesList = ({ categories, type }: Props) => {
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2}>
        <Typography variant={'h4'}>
          Категорії {type === CategoryTypes.INCOME ? 'доходів' : 'витрат'} ({categories?.length || 0})
        </Typography>
        <AddCategoryButton type={type} />
      </Stack>
      <Divider sx={{ my: 3 }} />
      {categories?.length ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
            gap: '16px'
          }}
        >
          {categories?.map(category => (
            <Box
              key={category.id}
              sx={{
                width: '100%',
                maxWidth: '400px'
              }}
            >
              <CategoryItem category={category} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>Не знайдено жодної категорії. Додайте нову категорію, натиснувши на кнопку "Додати".</Typography>
      )}
    </Box>
  )
}

export default CategoriesList

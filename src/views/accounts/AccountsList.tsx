import React from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { Account } from '@/types/accounts'
import AddAccountButton from '@views/accounts/AddAccountButton'
import AccountItem from '@views/accounts/AccountItem'

type Props = {
  accounts?: Account[]
}

const AccountsList = ({ accounts }: Props) => {
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2}>
        <Typography variant={'h4'}>Рахунки ({accounts?.length || 0})</Typography>
        <AddAccountButton />
      </Stack>
      <Divider sx={{ my: 3 }} />
      {accounts?.length ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
            gap: '16px'
          }}
        >
          {accounts?.map(account => (
            <Box
              key={account.id}
              sx={{
                width: '100%',
                maxWidth: '400px'
              }}
            >
              <AccountItem account={account} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>
          Не знайдено жодного рахунку. Додайте новий акаунт, натиснувши на кнопку &#34;Додати&#34;.
        </Typography>
      )}
    </Box>
  )
}

export default AccountsList

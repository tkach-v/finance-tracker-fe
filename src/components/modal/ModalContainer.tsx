import { Box } from '@mui/system'
import React, { Ref } from 'react'
import { SxProps } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

type ModalContentProps = {
  title?: string
  children?: React.ReactNode
  sx?: SxProps
  close: () => void
  closable?: boolean
}

const ModalContainer: React.FC<ModalContentProps> = React.forwardRef(
  ({ title, children, sx, close, closable = true }, _ref: Ref<HTMLElement>) => {
    return (
      <Card
        sx={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          minWidth: '300px',
          ...sx
        }}
      >
        {title && <CardHeader title={title} />}
        <CardContent className='flex flex-col items-start'>{children}</CardContent>
        {closable && (
          <Box
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              paddingRight: '20px',
              paddingTop: '20px',
              right: '0',
              top: '0'
            }}
          >
            <i
              className='ri-close-line'
              onClick={close}
              style={{
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            />
          </Box>
        )}
      </Card>
    )
  }
)

export default ModalContainer

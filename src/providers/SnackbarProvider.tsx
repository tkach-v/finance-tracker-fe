'use client'

import React, { FC } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { snackbarActions } from '@/store/slices/snackbarReducer'

const SnackbarProvider: FC = () => {
  const dispatch = useDispatch()

  const {
    visible: snackbarVisible,
    message: snackbarMessage,
    type: snackbarType
  } = useTypedSelector(state => state.snackbar)

  const hideSnackbar = () => {
    dispatch(snackbarActions.hideSnackbar())
  }

  return (
    <>
      {snackbarVisible && (
        <Snackbar
          open={snackbarVisible}
          onClose={hideSnackbar}
          autoHideDuration={8000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={snackbarMessage}
        >
          <Alert onClose={hideSnackbar} severity={snackbarType ?? 'info'}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default SnackbarProvider

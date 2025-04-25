import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useMemo } from 'react'
import { showSnackBar } from '@/store/slices/snackbarReducer'

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(
    () =>
      bindActionCreators(
        {
          showSnackBar
        },
        dispatch
      ),
    [dispatch]
  )
}

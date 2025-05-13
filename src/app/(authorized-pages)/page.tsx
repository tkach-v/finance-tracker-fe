import Grid from '@mui/material/Grid'
import TotalBalance from '@views/dashboard/TotalBalance'
import RecentTransactions from '@views/dashboard/RecentTransactions'

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TotalBalance />
      </Grid>
      <Grid item xs={12}>
        <RecentTransactions />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics

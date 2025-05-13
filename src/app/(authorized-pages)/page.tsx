import Grid from '@mui/material/Grid'
import TotalEarning from '@views/dashboard/TotalEarning'
import RecentTransactions from '@views/dashboard/RecentTransactions'

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TotalEarning />
      </Grid>
      <Grid item xs={12}>
        <RecentTransactions />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics

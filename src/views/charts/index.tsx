import Grid from '@mui/material/Grid'
import WeeklyOverview from '@views/dashboard/WeeklyOverview'

const Charts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <WeeklyOverview />
      </Grid>
    </Grid>
  )
}

export default Charts

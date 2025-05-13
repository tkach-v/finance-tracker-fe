'use client'

import dynamic from 'next/dynamic'

import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import type { ApexOptions } from 'apexcharts'
import { TransactionStatsResponse } from '@/api/types/statistics'

const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

type Props = {
  transactionStatsInfo: TransactionStatsResponse
}

const formatNumber = (val: number): string => {
  const abs = Math.abs(val)
  if (abs >= 1e9) return `${(val / 1e9).toFixed(1)}B`
  if (abs >= 1e6) return `${(val / 1e6).toFixed(1)}M`
  if (abs >= 1e3) return `${(val / 1e3).toFixed(1)}K`
  return `${val.toFixed(1)}`
}

const TransactionStatsChart = ({ transactionStatsInfo }: Props) => {
  const theme = useTheme()

  const divider = 'var(--mui-palette-divider)'
  const disabled = 'var(--mui-palette-text-disabled)'

  const categories = transactionStatsInfo.map(item => item.period)
  const expenses = transactionStatsInfo.map(item => item.expense)
  const incomes = transactionStatsInfo.map(item => item.income)

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        distributed: false,
        columnWidth: '40%'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: {
      show: true,
      labels: {
        colors: theme.palette.text.primary
      }
    },
    grid: {
      xaxis: { lines: { show: false } },
      strokeDashArray: 7,
      padding: { left: 0, top: -20, bottom: 13 },
      borderColor: divider
    },
    dataLabels: { enabled: false },
    colors: [theme.palette.success.main, theme.palette.error.main],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories,
      tickPlacement: 'on',
      labels: {
        show: true,
        style: {
          colors: disabled,
          fontSize: theme.typography.body2.fontSize as string
        }
      },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetY: 2,
        offsetX: -17,
        style: {
          colors: disabled,
          fontSize: theme.typography.body2.fontSize as string
        },
        formatter: (val: number) => formatNumber(val)
      },
      logarithmic: true,
      logBase: 10
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: val => `${val.toFixed(2)} USD` }
    }
  }

  const series = [
    { name: 'Витрати', data: expenses },
    { name: 'Доходи', data: incomes }
  ]

  return (
    <Card>
      <CardHeader title='Діаграма доходів та витрат (USD)' />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <AppReactApexCharts type='bar' height={520} width='100%' series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default TransactionStatsChart

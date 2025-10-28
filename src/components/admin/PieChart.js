import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const DonutChart = () => {
    const [chartData] = useState({
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                width: 380,
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                },
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                type: 'gradient',
            },
            legend: {
                formatter: function (val, opts) {
                    return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
                },
            },
            title: {
                text: 'Product Category Breakdown',
                style: {
                    fontSize: '16px',
                    fontWeight: 600,
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 250,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    })

    return (
        <div className="chart-container text-center border p-3 dashboard-card">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="donut"
                width={380}
            />
        </div>
    )
}

export default DonutChart

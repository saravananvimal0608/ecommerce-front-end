import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartComponent = () => {
    const series = [
        {
            name: "STOCK ABC",
            data: [8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9340.85]
        }
    ];

    const options = {
        chart: {
            type: "area",
            height: 350,
            zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        title: {
            text: "Fundamental Analysis of Stocks",
            align: "left"
        },
        subtitle: {
            text: "Price Movements",
            align: "left"
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01", "2023-05-01",
                "2023-06-01", "2023-07-01", "2023-08-01", "2023-09-01", "2023-10-01",
                "2023-11-01", "2023-12-01", "2024-01-01", "2024-02-01", "2024-03-01",
                "2024-04-01", "2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01"
            ]
        },
        yaxis: { opposite: true },
        legend: { horizontalAlign: "left" }
    };

    return (
        <div className="col-12 col-lg-10 mx-auto mt-4 border p-3 dashboard-card">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default ChartComponent;

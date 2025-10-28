import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaShoppingCart, FaListAlt, FaChartLine } from "react-icons/fa";
import ChartComponent from './ChartComponent';
import PieChart from './PieChart'

const Dashboard = () => {
    return (
        <div className="p-3 container">
            <h2 className="mb-5 fw-bold">Dashboard</h2>
            {/* Cards */}
            <div className="d-flex justify-content-around flex-wrap col-12 gap-3">
                <div className="dashboard-card col-12 col-md-5 col-xl-2 text-center position-relative">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaShoppingCart size={30} />
                        <span>Total Products</span>
                    </div>
                    <h3 className="mt-2 fw-bold">120</h3>
                    <FaShoppingCart size={100} className="dashboard-icon position-absolute" />
                </div>

                <div className="dashboard-card col-12 col-md-5 col-xl-2 text-center position-relative">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaUsers size={30} />
                        <span>Total Users</span>
                    </div>
                    <h3 className="mt-2 fw-bold">56</h3>
                    <FaUsers size={100} className="dashboard-icon position-absolute" />
                </div>

                <div className="dashboard-card col-12 col-md-5 col-xl-2 text-center position-relative">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaListAlt size={30} />
                        <span>Total Categories</span>
                    </div>
                    <h3 className="mt-2 fw-bold">8</h3>
                    <FaListAlt size={100} className="dashboard-icon position-absolute" />
                </div>

                <div className="dashboard-card col-12 col-md-5 col-xl-2 text-center position-relative">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaChartLine size={30} />
                        <span>Revenue</span>
                    </div>
                    <h3 className="mt-2 fw-bold">₹ 45,000</h3>
                    <FaChartLine size={100} className="dashboard-icon position-absolute" />
                </div>
            </div>

            {/* Chart */}
            <div className="d-flex flex-column flex-lg-row mt-4 gap-4 align-items-center justify-content-center">
                <div className="col-12 col-lg-4">
                    <PieChart />
                </div>
                <div className="col-12 col-lg-7">
                    <ChartComponent />
                </div>
            </div>
        </div>
    )
}

export default Dashboard

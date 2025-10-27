import { FaUsers } from "react-icons/fa";
import { FaShoppingCart, FaListAlt, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="d-flex justify-content-around flex-wrap col-12 gap-3 p-3">
            {/* Total Orders */}
            <div className="dashboard-card col-12 col-md-5 col-xl-2 text-center position-relative">
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <FaShoppingCart size={30} />
                    <span>Total Orders</span>
                </div>
                <h3 className="mt-2 fw-bold">120</h3>
                <FaShoppingCart size={100} className="dashboard-icon position-absolute" />
            </div>

            {/* Total Users */}
            <div className="dashboard-card col-12 col-md-5 col-xl-2 text-center position-relative">
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <FaUsers size={30} />
                    <span>Total Users</span>
                </div>
                <h3 className="mt-2 fw-bold">56</h3>
                <FaUsers size={100} className="dashboard-icon position-absolute" />
            </div>

            {/* Total Categories */}
            <div className="dashboard-card col-12 col-md-5 col-xl-2 text-center position-relative">
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <FaListAlt size={30} />
                    <span>Total Categories</span>
                </div>
                <h3 className="mt-2 fw-bold">8</h3>
                <FaListAlt size={100} className="dashboard-icon position-absolute" />
            </div>

            {/* Revenue */}
            <div className="dashboard-card col-12 col-md-5 col-xl-2 text-center position-relative">
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <FaChartLine size={30} />
                    <span>Revenue</span>
                </div>
                <h3 className="mt-2 fw-bold">₹ 45,000</h3>
                <FaChartLine size={100} className="dashboard-icon position-absolute" />
            </div>
        </div>
    )
}

export default Dashboard

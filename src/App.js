import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddAndEditUser from "./users/RegisterUser"
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <div className="App">
      <AddAndEditUser />
      <ToastContainer />
    </div>
  );
}

export default App;

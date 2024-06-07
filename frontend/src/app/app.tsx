import { EmployeeList } from './components/employee/employee-list'
import { MyProvider } from './contexts/items-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
    return (
        <MyProvider>
            <EmployeeList />
            <ToastContainer />
        </MyProvider>
    )
}

export default App

import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import AuthProvider from './context/Auth';

function App() {
  return(
    <div>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
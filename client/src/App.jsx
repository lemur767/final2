 
// This comment can be safely removed as it's not needed
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import Profile from './pages/profile';
import Chat from './pages/chat';


import AuthChecker from './components/AuthChecker';






const App = () => {
  return (
    <BrowserRouter>
    <AuthChecker />
      <Routes>
        <Route
          path="/auth"
          element={           
              <Auth />
            }
        />
        <Route
          path="/profile"
          element={        
            <Profile />
          }
        />
        <Route
          path="/chat"
          element={
            <Chat />
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

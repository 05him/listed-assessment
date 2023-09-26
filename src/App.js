import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Home } from './pages/Home/Home';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Error, BadAccess, NotFound } from './pages/Error/Error';

import { useLogin } from './';

function App() {

  const { isLoggedIn, isLoading } = useLogin();

  const Loader = () => {
    return <div className='container-loader' >
        <div className='loading-text' > Loading... </div>
    </div>
  }

  console.log(process.env.REACT_APP_CLIENT_ID);

  return (
    <>
    { isLoading && <Loader /> }
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/dashboard' element={ isLoggedIn ? <Dashboard /> : <BadAccess /> } />
      <Route path='/error' element={ <Error /> } />
      <Route path='*' element={ <NotFound /> } />
    </Routes>
    </>
  );
}

export default App;

import { SWRConfig } from 'swr'
import './App.css'

import Header from './fragments/Header';
import Nav from './fragments/Nav';
import Aside from './fragments/Aside';
import Footer from './fragments/Footer';
import AppRoutes from './routes/AppRoutes'
import { useLocation } from 'react-router-dom';
import useAuthStore from './stores/useAuthStore';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const checkAuth = useAuthStore(state=>state.checkAuth);

  // 이동할 때마다 인증 정보를 업데이트
  useEffect(()=>{
    checkAuth()
  }, [location]);  

  return (
    <div className="App">
      <Header />
      <Nav />
      <main>
        <Aside />
        <section>
          <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
            <AppRoutes />
          </SWRConfig>
        </section>
        <Aside />
      </main>
      <Footer />
    </div>
  )
}

export default App

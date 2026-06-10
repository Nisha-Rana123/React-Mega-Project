import { useState ,useEffect} from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login , logout} from './store/authSlice';
import {Header,Footer} from './components/index';
import { Outlet } from 'react-router-dom';
function App() {
 
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
  authService.getCurrentUser().then((userData)=>{
    if(userData){
      dispatch(login(userData))
    }
    else{
      dispatch(logout());
    }
  })
  .catch((error)=>{
    dispatch(logout());
  })
  .finally(()=>{setLoading(false)})
},[])
  console.log("app render")
 return !loading ? (
  <div className="min-h-screen overflow-hidden bg-[#0F172A] text-slate-100">
    <div className='w-full block'>
      <Header/>
      <main className="min-h-[70vh]">
    <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
 ): null; 
}

export default App

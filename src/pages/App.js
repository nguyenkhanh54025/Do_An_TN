import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import AdminHeaderComponent from '../components/AdminHeaderComponent'
import FooterComponent from '../components/FooterComponent'
import { Outlet, useLocation } from 'react-router-dom'
import HomePage from './HomePage'

export default function App() {
    const { pathname } = useLocation()
    const role = localStorage.getItem('role');
    if(role)
        {
            if(role==0){
                return (
                    <>
                        <HeaderComponent />
            
                        <>
                            {
                                pathname === '/' ? <HomePage /> : <Outlet />
                            }
                        </>
            
                        <FooterComponent />
                    </>
                )
            }else{
                return (
                    <>
                        <AdminHeaderComponent />
            
                        <>
                            {
                                pathname === '/' ? <HomePage /> : <Outlet />
                            }
                        </>
            
                        <FooterComponent />
                    </>
                )
            }
        }else{
            return (
                <>
                    <HeaderComponent />
        
                    <>
                        {
                            pathname === '/' ? <HomePage /> : <Outlet />
                        }
                    </>
        
                    <FooterComponent />
                </>
            )
        }
  
}

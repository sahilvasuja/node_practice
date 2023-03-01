import Head from 'next/head'
import Image from 'next/image'

import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Middle } from '@/components/Middle'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <div className="container">
      <Header />
      <Middle /> 
      {/* <Footer /> */}
    </div>
  
    </>
  )
}

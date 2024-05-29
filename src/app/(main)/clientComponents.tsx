"use client"
import React from 'react'

import Headers from '@/components/ui/header'
import SideBar from '@/components/ui/sideBar'

const ClientComponent = ({ children }: any) => {
  const [isOpen, setIsOpen] = React.useState(false)
  console.log(isOpen)
  return (
    <>
      <Headers isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='  flex  mt-28  '>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        {children}

      </div>
    </>
  )
}

export default ClientComponent

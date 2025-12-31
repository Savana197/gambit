'use client'

import { useEffect } from "react"


export default function BootstrapClient(){
useEffect(()=>{
    import('bootstrap/dist/js/bootstrap.bundle').then((bs) => {
      window.bootstrap = bs
    })
}, [])
return null;
}
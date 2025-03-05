"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Login from "@/components/Login"

const AuthPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const id_token = localStorage.getItem("id_token")
    if (id_token) {
      router.replace("/dashboard") 
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) return <div className="h-full flex items-center justify-center">Cargando...</div>

  return (
    <div className="h-full">
      <Login />
    </div>
  )
}

export default AuthPage

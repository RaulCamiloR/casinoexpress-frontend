"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Props {
  id_token: string;
  access_token: string;
  refresh_token: string;
}

const Redirect = ({ id_token, access_token, refresh_token }: Props) => {
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem("id_token", id_token);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    router.push("/dashboard")
  }, [id_token, router])

  return <div>Redireccionando...</div>
}

export default Redirect

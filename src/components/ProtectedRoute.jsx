import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../supabase"

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      setIsAdmin(profile?.role === "admin")
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

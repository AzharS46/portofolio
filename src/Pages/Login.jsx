import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, LogIn, Eye, EyeOff, Code2 } from "lucide-react"
import { supabase } from "../supabase"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!supabase) {
      setError("Supabase is not configured. Please add your credentials to .env file.")
      setLoading(false)
      return
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profileError || profile?.role !== "admin") {
        await supabase.auth.signOut()
        throw new Error("Access denied. Admin privileges required.")
      }

      navigate("/admin")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <Helmet>
        <title>Admin Login</title>
      </Helmet>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-30" />
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Code2 className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage your portfolio</p>
        </div>

        {/* Login Form */}
        <div className="glass rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Email</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                <div className="relative flex items-center glass rounded-xl overflow-hidden">
                  <Mail className="w-4 h-4 text-gray-400 ml-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@email.com"
                    className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-gray-500 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Password</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                <div className="relative flex items-center glass rounded-xl overflow-hidden">
                  <Lock className="w-4 h-4 text-gray-400 ml-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-gray-500 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 mr-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-500" />
              <div className="relative flex items-center justify-center gap-2 py-3 bg-dark rounded-lg border border-white/10 overflow-hidden">
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-primary/20 to-accent/20" />
                {loading ? (
                  <div className="spinner w-5 h-5" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4 text-white z-10" />
                    <span className="text-sm font-medium text-white z-10">Sign In</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Back link */}
        <div className="text-center mt-4">
          <button onClick={() => navigate("/")} className="text-sm text-gray-500 hover:text-primary transition-colors">
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

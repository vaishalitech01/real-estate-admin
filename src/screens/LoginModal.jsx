import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, X, Building2 } from "lucide-react"

export default function LoginModal({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation for demo
    if (loginData.email === "admin@realestate.com" && loginData.password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      alert("Logged in successfully!");
      onClose();
      window.location.reload(); // Refresh to update login state
    } else {
      alert("Invalid credentials. Use admin@realestate.com / admin123");
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 pointer-events-none"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400">Sign in to your admin dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@realestate.com"
                value={loginData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 hover:border-slate-500 focus:border-blue-500 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 hover:border-slate-500 focus:border-blue-500 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3 text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-slate-200">Demo Credentials:</p>
            <p>Email: <span className="text-blue-400">admin@realestate.com</span></p>
            <p>Password: <span className="text-blue-400">admin123</span></p>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-600/50 disabled:to-cyan-600/50 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 disabled:shadow-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

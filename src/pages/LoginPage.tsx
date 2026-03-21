import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { lumi } from '@/lib/lumi'
import { useAuth } from '@/hooks/useAuth'
import {Mail, Lock, User as UserIcon, Chrome} from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin')
    }
  }, [isAuthenticated, navigate])

  // OTP countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      setError('Digite seu email')
      return
    }

    setLoading(true)
    setError('')

    try {
      await lumi.auth.sendOtp({
        email,
        type: mode === 'reset' ? 'resetPassword' : 'register',
      })
      setCountdown(60)
      console.log('OTP sent successfully')
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar código')
      console.error('Send OTP failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // Email/Password Login
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { user } = await lumi.auth.signInWithPassword({ email, password })
      console.log('Login successful:', user)
      window.location.href = '/admin'
    } catch (err: any) {
      setError(err.message || 'Email ou senha incorretos')
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // Google OAuth Login
  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      await lumi.auth.signInWithOAuth({ provider: 'google' })
      console.log('Google OAuth initiated')
      // Popup will handle the flow
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login com Google')
      console.error('Google login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // Register with OTP
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!otp) {
      setError('Digite o código OTP enviado para seu email')
      return
    }

    setLoading(true)
    setError('')

    try {
      await lumi.auth.signUpWithPassword({
        email,
        password,
        otp,
        userName: userName || email.split('@')[0],
      })
      console.log('Registration successful')
      window.location.href = '/admin'
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta')
      console.error('Registration failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!otp) {
      setError('Digite o código OTP enviado para seu email')
      return
    }

    setLoading(true)
    setError('')

    try {
      await lumi.auth.resetPassword({
        email,
        newPassword: password,
        otp,
      })
      console.log('Password reset successful')
      window.location.href = '/admin'
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir senha')
      console.error('Reset password failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#FF0000] rounded-2xl mb-4 glow-orange-strong">
            <span className="text-white font-black text-3xl">R</span>
          </div>
          <h1 className="text-3xl font-black text-white glow-orange mb-2">RESCAR</h1>
          <p className="text-gray-400">Painel Administrativo</p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#1A1A1A] border border-[#FF6B00]/20 rounded-2xl p-8 shadow-2xl">
          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6 bg-[#0A0A0A] p-1 rounded-lg">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-300 ${
                mode === 'signin'
                  ? 'bg-[#FF6B00] text-white glow-orange'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-300 ${
                mode === 'signup'
                  ? 'bg-[#FF6B00] text-white glow-orange'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Cadastro
            </button>
            <button
              onClick={() => setMode('reset')}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-300 ${
                mode === 'reset'
                  ? 'bg-[#FF6B00] text-white glow-orange'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Recuperar
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Forms */}
          <form onSubmit={mode === 'signin' ? handleSignIn : mode === 'signup' ? handleSignUp : handleResetPassword}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Username (only for signup) */}
            {mode === 'signup' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome de Usuário</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full pl-11 pr-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* OTP Section (for signup and reset) */}
            {(mode === 'signup' || mode === 'reset') && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Código OTP</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Digite o código"
                    className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                    required={mode !== 'signin'}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={countdown > 0 || loading}
                    className="px-6 py-3 bg-[#1A1A1A] border border-[#FF6B00]/30 text-white rounded-lg font-semibold hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {countdown > 0 ? `${countdown}s` : 'Enviar'}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-bold text-lg transition-all duration-300 hover:glow-orange-strong disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {loading ? 'Processando...' : mode === 'signin' ? 'Entrar' : mode === 'signup' ? 'Criar Conta' : 'Redefinir Senha'}
            </button>

            {/* Google OAuth (only for signin) */}
            {mode === 'signin' && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1A1A1A] text-gray-400">ou</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-3 bg-white hover:bg-gray-100 text-gray-800 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Chrome className="w-5 h-5" />
                  Continuar com Google
                </button>
              </>
            )}
          </form>

          {/* Back to Home */}
          <button
            onClick={() => navigate('/')}
            className="w-full mt-6 py-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Voltar para o site
          </button>
        </div>
      </div>
    </div>
  )
}

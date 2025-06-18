import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signInWithGoogle, signInWithEmail, createUserWithEmail } from '../services/firebase'
import { accountAPI } from '../services/api'
import { useStore } from '../store/useStore'

interface LoginForm {
  email: string
  password: string
  privacyAccepted: boolean
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useStore()

  const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginForm>()

  const handleGoogleSignIn = async () => {
    if (!isLogin && !watch('privacyAccepted')) {
      alert('Bitte stimmen Sie der Datenschutzerklärung zu.')
      return
    }

    try {
      setLoading(true)
      const result = await signInWithGoogle()

      if (!isLogin) {
        await accountAPI.register({
          email: result.user.email,
          authProvider: 'google',
          privacyAccepted: true
        })
      }

      navigate('/stocks')
    } catch (error) {
      console.error('Google Sign-In Error:', error)
      alert('Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true)

      if (isLogin) {
        await signInWithEmail(data.email, data.password)
      } else {
        if (!data.privacyAccepted) {
          alert('Bitte stimmen Sie der Datenschutzerklärung zu.')
          return
        }

        const result = await createUserWithEmail(data.email, data.password)
        await accountAPI.register({
          email: data.email,
          authProvider: 'email',
          privacyAccepted: true
        })
      }

      navigate('/stocks')
    } catch (error: any) {
      console.error('Auth Error:', error)
      alert(error.message || 'Ein Fehler ist aufgetreten.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Bei Ihrem Konto anmelden' : 'Neues Konto erstellen'}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-Mail-Adresse
              </label>
              <input
                {...register('email', {
                  required: 'E-Mail ist erforderlich',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Ungültige E-Mail-Adresse'
                  }
                })}
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="ihre@email.de"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passwort
              </label>
              <input
                {...register('password', {
                  required: 'Passwort ist erforderlich',
                  minLength: {
                    value: 6,
                    message: 'Passwort muss mindestens 6 Zeichen lang sein'
                  }
                })}
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Passwort"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {!isLogin && (
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('privacyAccepted', {
                      required: 'Sie müssen der Datenschutzerklärung zustimmen'
                    })}
                    type="checkbox"
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-gray-700">
                    Ich stimme der{' '}
                    <a href="/privacy" className="text-primary-600 hover:text-primary-500">
                      Datenschutzerklärung
                    </a>{' '}
                    zu
                  </label>
                  {errors.privacyAccepted && (
                    <p className="mt-1 text-sm text-red-600">{errors.privacyAccepted.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Wird geladen...' : (isLogin ? 'Anmelden' : 'Registrieren')}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Oder</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              Mit Google {isLogin ? 'anmelden' : 'registrieren'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-600 hover:text-primary-500 text-sm"
            >
              {isLogin
                ? 'Noch kein Konto? Jetzt registrieren'
                : 'Bereits ein Konto? Hier anmelden'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

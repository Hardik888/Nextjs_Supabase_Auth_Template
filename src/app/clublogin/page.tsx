'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Gauge } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CSSTransition } from 'react-transition-group'
import { toast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signIn')
  const supabase = createClientComponentClient()
  const router = useRouter()

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      toast({
        title: "Signup Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Signup Successful",
        description: "Please check your email for verification.",
      })
      clearInputs()
    }
  }

  const handleSignIn = async () => {
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome back Customise Your Club",
      })
      clearInputs()
      router.push('/dashboard')
    }
  }

  const handleSubmit = () => {
    if (mode === 'signUp') {
      handleSignup()
    } else {
      handleSignIn()
    }
  }

  return (
    <div className="flex h-screen flex-row-reverse">
 

      <div className="w-full lg:w-[65%] lg:pb-[2rem] lg:mt-2 lg:pr-[5rem] flex justify-center items-center">
        <div className="w-full border-neutral-100/10 border bg-neutral-900/50 rounded-lg p-12 max-w-lg lg:px-0 px-1">
          <h2 className="lg:text-[30px] lg:text-6xl text-3xl font-bold bg-gradient-text animate-in fade-in zoom-in duration-500 pt-2 lg:pb-2 text-[#1E1E1E] text-center">
            {mode === 'signUp' ? 'Create an Account' : 'Login to your account'}
          </h2>

          <CSSTransition
            key={mode}
            in={true}
            timeout={300}
            classNames="transition"
            unmountOnExit
          >
            <Card className="animate-in fade-in zoom-in duration-500 bg-transparent shadow-none border-none pb-[1rem] px-5 pt-[3rem]">
              <CardContent>
                <div className='space-y-7'>
                  <CSSTransition
                    in={true}
                    timeout={300}
                    classNames="transition"
                    unmountOnExit
                  >
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 h-[3rem] mb-4 placeholder:text-red-100/50 bg-neutral-800 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </CSSTransition>

                  <CSSTransition
                    in={true}
                    timeout={300}
                    classNames="transition"
                    unmountOnExit
                  >
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 h-[3rem] placeholder:text-red-500/50 mb-4 bg-neutral-800 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </CSSTransition>

                  <Button
                    onClick={handleSubmit}
                    className="w-full flex text-xl font-bold items-center justify-center space-x-2 text-white bg-transparent hover:bg-[#1E1E1E]/50"
                  >
                    <h2 className='bg-gradient-text text-2xl font-bold'>
                      {mode === 'signUp' ? 'Sign Up' : 'Sign In'}
                    </h2>
                  </Button>

                  <Button
                    onClick={() => setMode(mode === 'signUp' ? 'signIn' : 'signUp')}
                    className="w-full mt-4 flex text-xl font-bold items-center justify-center space-x-2 text-white bg-transparent hover:bg-transparent"
                  >
                    <h2 className='text-neutral-100/70 text-xl font-bold'>
                      {mode === 'signUp' ? 'Already have an account? Sign In' : 'New here? Sign Up'}
                    </h2>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CSSTransition>
        </div>
      </div>
    </div>
  )
}
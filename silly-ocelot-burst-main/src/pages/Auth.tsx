"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { BarChart2, Mail, Lock, ArrowRight } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        showSuccess("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showSuccess("Welcome back, Trader!");
        navigate('/');
      }
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[#00D09C] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <BarChart2 className="text-white w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900">TradeGuru</h1>
            <p className="text-slate-500">Simple. Transparent. Secure.</p>
          </div>
        </div>

        <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-2xl">{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
            <CardDescription className="text-slate-500">
              {isSignUp ? 'Join thousands of traders today.' : 'Login to manage your investments.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600 font-semibold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 pl-12 bg-slate-50 border-none rounded-xl focus-visible:ring-[#00D09C]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" id="password-label" className="text-slate-600 font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 bg-slate-50 border-none rounded-xl focus-visible:ring-[#00D09C]"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-14 bg-[#00D09C] hover:bg-[#00D09C]/90 text-white rounded-xl text-lg font-bold shadow-lg shadow-emerald-500/10" disabled={loading}>
                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm font-bold text-[#00D09C] hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const url = request.nextUrl.clone()

  const isProtectedDashboard = url.pathname.startsWith('/dashboard')
  const isProtectedAdmin = url.pathname.startsWith('/admin')
  const isAuthPage = url.pathname.startsWith('/auth')

  // 1. Utilisateur non connecté → protéger les routes privées
  if (!user) {
    if (isProtectedDashboard || isProtectedAdmin) {
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // 2. Utilisateur connecté → récupérer le rôle via le service client (bypass RLS)
  const serviceClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
  const { data: profile, error: profileError } = await serviceClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error('[Middleware] Profile query error:', profileError)
  }
  console.log('[Middleware] user.id:', user.id, '| role:', profile?.role)

  const role = profile?.role

  // 3. Utilisateur connecté qui visite une page d'auth → rediriger vers son espace
  if (isAuthPage) {
    url.pathname = role === 'admin' ? '/admin' : '/dashboard'
    return NextResponse.redirect(url)
  }

  // 4. Admin qui tente d'accéder au dashboard client → rediriger vers /admin
  if (role === 'admin' && isProtectedDashboard) {
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  // 5. Client qui tente d'accéder à l'espace admin → rediriger vers /dashboard
  if (role !== 'admin' && isProtectedAdmin) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
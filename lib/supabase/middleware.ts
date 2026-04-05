import { createServerClient } from '@supabase/ssr'
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

  if (user) {
    // 1. On récupère le rôle réel
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()

    // 2. FORCE LA REDIRECTION ADMIN
    // Si tu es admin et que tu n'es pas déjà sur une page /admin
    if (profile?.role === 'admin' && !url.pathname.startsWith('/admin')) {
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }

    // 3. PROTECTION CLIENT
    // Si tu es client et que tu tentes d'aller en admin
    if (profile?.role === 'client' && url.pathname.startsWith('/admin')) {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
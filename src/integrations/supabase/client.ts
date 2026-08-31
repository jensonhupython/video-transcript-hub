/**
 * @deprecated Import from '@/lib/supabase/client' (browser) or
 * '@/lib/supabase/server' (server) instead. This file is a thin
 * backward-compat shim kept so leftover imports of the old path
 * continue to resolve during the Vite → Next.js migration.
 */
import { createClient as createBrowserSupabaseClient } from '@/lib/supabase/client'

export { createClient } from '@/lib/supabase/client'

type SupabaseBrowserClient = ReturnType<typeof createBrowserSupabaseClient>

let _supabase: SupabaseBrowserClient | undefined

/**
 * @deprecated Use `createClient()` from '@/lib/supabase/client' inside
 * client components instead. Retained to keep old
 * `import { supabase } from '@/integrations/supabase/client'` imports
 * working; lazily instantiated on first property access.
 */
export const supabase = new Proxy({} as SupabaseBrowserClient, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createBrowserSupabaseClient()
    return Reflect.get(_supabase, prop, receiver)
  },
})

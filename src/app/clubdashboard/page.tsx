import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientLogoutButton from '../LogoutButton';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Redirect to the homepage if no session is found
    redirect('/');
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <ClientLogoutButton /> {/* Render the client-side logout button */}
    </div>
  );
}

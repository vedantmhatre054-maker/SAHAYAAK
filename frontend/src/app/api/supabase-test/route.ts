import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return Response.json(
      {
        connected: false,
        error: error.message,
      },
      { status: 500 },
    );
  }

  return Response.json({
    connected: true,
    authenticated: Boolean(session),
    user: session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
        }
      : null,
  });
}
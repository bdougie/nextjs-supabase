// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '../../lib/supabaseClient'

async function run() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, website, updated_at')
    .order('updated_at', { ascending: false })

  if (error || !data) {
    throw error || new Error('No data')
  }

  return data
}

export default function handler(req, res) {
  run().then(data => {
    res.status(200).json(data)
  });
}
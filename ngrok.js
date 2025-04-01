import 'dotenv/config'
import ngrok from '@ngrok/ngrok'

(async function() {
  const port = process.env.VITE_PORT || 3000
  const listener = await ngrok.forward({
    addr: port,
    authtoken_from_env: true
  });

  // Output ngrok url to console
  console.log(`Ingress established at: ${listener.url()}`)
})()

process.stdin.resume()
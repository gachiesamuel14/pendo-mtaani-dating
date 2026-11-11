import './globals.css'

export const metadata = {
  title: 'Pendo Mtaani - Kenya Dating',
  description: 'Location-based matchmaking for people in Kenya. Find someone nearby.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gradient-to-br from-pink-50 to-purple-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}

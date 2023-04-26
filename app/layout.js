import '../styles/globals.css'

export default function Layout({ children }) {
  return (
    <html lang="en">
    <head>
       <title>VrnMap</title>
       <link rel="icon" href="/favicon.ico" />
    </head>
     <body>
        {children}
      </body>
    </html>
  )
}
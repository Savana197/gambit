import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import BootstrapClient from '../components/bootstrap';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient></BootstrapClient>
        {children}
      </body>
    </html>
  );
}

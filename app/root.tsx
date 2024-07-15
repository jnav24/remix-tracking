import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import './tailwind.css';
import { useEffect } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

        if (localStorage.getItem('color-theme') === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.toggle('dark', matchMedia.matches);
            matchMedia.addEventListener('change', (e) => {
                document.documentElement.classList.toggle('dark', e.matches);
            });
        }
    }, []);

    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

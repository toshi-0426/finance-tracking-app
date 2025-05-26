import Link from "next/link"
import ThemeSwitch from "./dark-mode-toggle"

type PageHeaderProps = {
  className?: string
}

export default async function PageHeader({className = ''}: PageHeaderProps) {
    return (
        <>
            <header className={`flex justify-between items-center ${className}`}>
                <Link href="/dashboard" 
                    className='text-xl hover:underline hover:underline-offset-8 decoration-2'
                >
                    Finance App
                </Link>
                <div className='flex items-center'>
                    <div><ThemeSwitch/></div>
                    
                    <div>User Dropdown</div>

                </div>
            </header>
            
        </>
    )
}
import React from 'react'
import { useTheme } from 'next-themes'

const Header = () => {
    const {theme, setTheme} = useTheme();

    return (
        <div className='fixed top-[10px] right-[15px]'>
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="px-3 py-2 rounded ease-in-out duration-300 h-12 w-12 order-2 md:order-3 absolute left-2/4 transform -translate-x-2/4 lg:transform-none md:relative md:left-0 hover:bg-gray-200 dark:hover:bg-neutral-700"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="h-6 w-6 text-gray-800 dark:text-white"
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            </button>
        </div>
    )
}

export default Header;

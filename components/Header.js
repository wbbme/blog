import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add('sticky-nav-full')
      } else {
        navRef.current.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${!fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
          }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a>
              <div className="h-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2091 0H7.79085C3.48808 0 0 3.48808 0 7.79085V16.2091C0 20.5119 3.48808 24 7.79085 24H16.2091C20.5119 24 24 20.5119 24 16.2091V7.79085C24 3.48808 20.5119 0 16.2091 0Z" fill="black" />
                  <path d="M11.4834 11.3853C11.9149 11.5771 12.3333 11.7645 12.6479 12.1097C12.7883 12.2635 12.9111 12.4337 13.0369 12.6002C13.5169 13.2347 13.6385 13.9667 13.5635 14.7311C13.5272 15.1578 13.3899 15.5697 13.163 15.9329C12.7099 16.6395 12.0996 17.124 11.2811 17.3647C10.944 17.4648 10.594 17.5151 10.2423 17.514H4.3782C4.11245 17.514 4.11208 17.514 4.11208 17.2404C4.11208 13.7359 4.11071 10.2313 4.10797 6.72673C4.10797 6.55056 4.15537 6.50278 4.33192 6.50278C5.82492 6.50913 7.31568 6.51286 8.80794 6.50278C9.40514 6.49905 9.97136 6.60542 10.4685 6.93463C11.0023 7.2881 11.4632 7.71845 11.7096 8.33842C11.8675 8.73519 11.9727 9.13979 11.9798 9.56642C11.9917 10.1047 11.8638 10.6369 11.6084 11.1109C11.5607 11.1964 11.5256 11.2901 11.4834 11.3853ZM5.67562 15.8531C5.7387 15.8575 5.79432 15.8643 5.8503 15.8643C7.37093 15.8643 8.89155 15.8672 10.4118 15.8617C10.5769 15.859 10.7409 15.8339 10.8993 15.787C11.4965 15.6161 11.7839 15.1588 11.8947 14.5982C12.0112 14.0107 11.7667 13.5124 11.333 13.1291C11.0676 12.8947 10.7227 12.8245 10.3625 12.826C8.85945 12.832 7.35637 12.8282 5.85329 12.829C5.79693 12.829 5.74132 12.8353 5.67637 12.8391L5.67562 15.8531ZM5.66629 8.12418C5.66629 9.11068 5.66629 10.0752 5.66629 11.0396C5.66629 11.1766 5.74654 11.193 5.86001 11.1927C6.80172 11.1901 7.74343 11.1975 8.68477 11.1863C8.90045 11.1885 9.11472 11.1513 9.31705 11.0766C9.77242 10.89 10.1569 10.6246 10.3073 10.1061C10.4241 9.70265 10.4174 9.31335 10.2289 8.94906C9.94934 8.40785 9.4824 8.12418 8.87177 8.11821C7.8666 8.1085 6.86144 8.11522 5.85628 8.11597C5.79917 8.11522 5.74281 8.12045 5.66629 8.12418V8.12418Z" fill="white" />
                  <path d="M13.6337 9.62015C13.5445 7.97784 15.0894 6.47066 16.7638 6.48484C18.4621 6.50089 19.9062 7.94836 19.9009 9.62537C19.8957 11.3423 18.4628 12.7629 16.7567 12.7708C15.0935 12.7801 13.5561 11.3311 13.6337 9.62015ZM15.2428 9.56864C15.2372 10.0427 15.3857 10.4085 15.6735 10.716C15.811 10.8593 15.9761 10.9732 16.1589 11.0508C16.3417 11.1284 16.5383 11.168 16.7369 11.1673C17.1376 11.1697 17.5236 11.0164 17.8133 10.7395C17.9626 10.5972 18.0823 10.4268 18.1655 10.2381C18.2488 10.0494 18.294 9.84612 18.2986 9.63993C18.3026 9.43832 18.2656 9.238 18.1897 9.05119C18.1138 8.86438 18.0006 8.695 17.857 8.5534C17.5551 8.25815 17.1852 8.12042 16.7626 8.11371C15.9027 8.10027 15.2308 8.76652 15.2428 9.56864Z" fill="white" />
                  <path d="M16.7656 15.1234H14.615C14.391 15.1234 14.385 15.1185 14.385 14.8994C14.385 14.5292 14.3903 14.1593 14.3824 13.7894C14.3791 13.6293 14.4261 13.5654 14.5978 13.5654C16.0373 13.5707 17.477 13.5707 18.917 13.5654C19.0563 13.5654 19.1108 13.5979 19.1074 13.7476C19.0982 14.1457 19.0982 14.5446 19.1074 14.9442C19.1111 15.0935 19.0555 15.1264 18.917 15.1252C18.1997 15.12 17.4826 15.1234 16.7656 15.1234Z" fill="white" />
                </svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
              <p className="ml-2 font-medium text-day dark:text-night header-name">
                {navBarTitle}
              </p>
            )
            : (
              <p className="ml-2 font-medium text-day dark:text-night header-name">
                {BLOG.title},{' '}
                <span className="font-normal">{BLOG.description}</span>
              </p>
            )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/me', show: BLOG.showAbout },
    // { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
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
                <svg width="212" height="256" viewBox="0 0 212 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M209.991 214.645C199.371 232.918 179.054 234.401 165.67 218.111C154.028 203.965 143.349 189.038 132.288 174.411C102.333 134.799 72.1781 95.3262 42.5438 55.4532C32.0646 41.4274 20.1227 33.8335 2.18982 41.6879C6.49772 25.8789 31.3433 21.8716 43.0849 34.5949C55.3473 47.8592 65.3256 62.8867 76.2256 77.193C107.904 118.849 139.321 160.706 170.859 202.483C182.2 217.49 190.996 220.375 209.991 214.645Z" fill="#20230B" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M145.592 241.274C157.554 256.802 177.11 260.449 191.958 249.97C175.006 252.134 164.347 243.959 155.23 231.636C129.386 196.994 103.363 162.485 77.3423 127.978C65.436 112.188 53.5301 96.3997 41.6419 80.5992C38.2142 75.6528 33.851 71.4257 28.7984 68.1564C16.1152 60.6226 0.746925 68.497 0.646741 83.224C0.326153 129.228 0.105803 175.193 0.827125 221.277C1.16775 243.077 21.485 258.806 42.6638 255.58C60.7971 252.815 73.6606 237.847 73.901 218.372C74.0458 203.38 74.0004 188.406 73.9521 172.513C73.927 164.211 73.901 155.658 73.901 146.72C76.247 149.819 78.0185 152.098 79.5261 154.038C80.7482 155.611 81.7968 156.96 82.8374 158.342C89.299 166.891 95.7414 175.456 102.184 184.021C116.579 203.158 130.976 222.297 145.592 241.274ZM60.0712 190.442C60.0534 185.892 60.0356 181.342 60.0356 176.796L60.0958 176.896V134.819C60.0958 134.558 60.0972 134.298 60.0985 134.038C60.1146 131.028 60.1302 128.11 57.9719 125.361C50.7375 116.07 43.6049 106.704 36.4735 97.3396C33.1169 92.932 29.7606 88.5248 26.394 84.1257C24.3102 81.4208 21.7254 78.7959 18.0987 80.3187C14.4721 81.8415 14.2116 85.2879 14.2116 88.7542C14.2237 101.852 14.212 114.949 14.2003 128.044C14.1733 158.258 14.1463 188.465 14.4119 218.672C14.5522 232.918 24.7509 242.376 37.7147 242.095C50.6784 241.815 59.8152 232.097 60.0356 217.771C60.1425 208.659 60.1068 199.548 60.0712 190.442Z" fill="#20230B" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M67.5698 16.1611C55.2072 -0.0285832 37.0539 -4.37653 19.4817 5.98246C38.737 3.63816 49.0359 14.1774 58.5533 27.1011C84.2099 61.4492 110.041 95.6616 135.871 129.873C147.198 144.876 158.525 159.878 169.837 174.892C173.865 180.242 177.972 185.471 184.164 188.557C197.027 194.909 211.353 187.175 211.353 172.868C211.754 127.171 211.754 81.4808 211.353 35.7971C211.213 21.3105 203.439 10.4707 190.575 4.01884C177.712 -2.43299 165.249 -0.890158 153.668 7.02435C142.988 14.3177 137.899 24.857 137.899 37.7406V108.911C136.543 107.233 135.366 105.79 134.316 104.502C132.107 101.791 130.458 99.7686 128.882 97.6905C121.653 88.0793 114.438 78.473 107.23 68.8761C94.0026 51.2637 80.7988 33.683 67.5698 16.1611ZM197.688 165.655V101.618C197.688 94.7243 197.708 87.831 197.728 80.9383C197.768 67.1553 197.808 53.3753 197.688 39.6041C197.568 23.9754 188.03 13.7166 174.506 13.957C160.981 14.1975 151.724 24.5565 151.724 40.105C151.674 53.5692 151.674 67.0734 151.674 80.5877C151.674 94.103 151.674 107.628 151.624 121.134C151.366 125.116 152.554 129.057 154.97 132.234C160.533 139.36 165.974 146.583 171.416 153.807C175.599 159.359 179.783 164.912 184.023 170.424C184.231 170.695 184.439 170.973 184.649 171.254C186.829 174.17 189.221 177.369 193.681 175.834C197.926 174.372 197.82 170.72 197.719 167.225C197.703 166.695 197.688 166.169 197.688 165.655Z" fill="#20230B" />
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

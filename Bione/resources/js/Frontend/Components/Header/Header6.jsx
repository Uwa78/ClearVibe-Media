import React, { useEffect, useState, useRef } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import MenuItem from "@/Admin/Components/Header/MenuItem"
import { useSelector } from "react-redux"
import SideHeader from "./SideHeader"
import GlobalSearch from "./GlobalSearch"
import LanguageDropdown from "./LanguageDropdown"
import gravatarUrl from "gravatar-url"
import translate from "@/utils/translate"
import { Icon } from "@iconify/react"

export default function Header6() {
    const { currentLang } = useSelector((state) => state.pages)
    const customize = useSelector((state) => state.customize)
    const [sideHeaderToggle, setSideHeaderToggle] = useState(false)
    const [mobileToggle, setMobileToggle] = useState(false)
    const [isSticky, setIsSticky] = useState()
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const { lang, auth } = usePage().props
    const currentLanguage = currentLang ?? lang.default_lang
    const mainMenus = localStorage.getItem("main_menu") ? JSON.parse(localStorage.getItem("main_menu")) : []
    const menus = mainMenus ? organizeMenusIntoHierarchy(mainMenus[currentLanguage]) : []

    const handleProfileDropdownToggle = () => setProfileDropdownOpen(!profileDropdownOpen)

    // handle logout
    const handleLogout = () => {
        showAlert(`${translate("Are you sure")}?`, `${translate("You want to logout this session")}?`, `${translate("Logout")}!`, () => {
            router.post(route("logout"))
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        })
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".cs_dropdown_wrap")) {
                setProfileDropdownOpen(false)
            }
        }

        if (profileDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [profileDropdownOpen])

    return (
        <>
            <header
                className={`cs_site_header cs_style_1 cs_color_1 cs_primary_bg cs_sticky_header cs_size_md${isSticky ? " cs_sticky_active" : ""}`}
            >
                <div className="cs_main_header">
                    <div className="container">
                        <div className="cs_main_header_in">
                            <div className="cs_main_header_left">
                                <Link className="cs_site_branding" to="/" href="/">
                                    <img src={customize?.general?.site_logo_light} alt={customize?.general?.site_name} />
                                </Link>
                            </div>
                            <div className="cs_main_header_center">
                                <div className="cs_nav">
                                    <nav className={`cs_nav_list_wrap${mobileToggle ? " cs_active" : ""}`}>
                                        <ul className="cs_nav_list">
                                            {menus.map((menuItem) => (
                                                <MenuItem setMobileToggle={setMobileToggle} key={menuItem.id} item={menuItem} />
                                            ))}
                                        </ul>
                                    </nav>
                                    <span
                                        className={`cs_menu_toggle${mobileToggle ? " cs_toggle_active" : ""}`}
                                        onClick={() => setMobileToggle(!mobileToggle)}
                                    >
                                        <span></span>
                                    </span>
                                </div>
                            </div>
                            <div className="cs_main_header_right">
                                <div className="cs_toolbox">
                                    <GlobalSearch />
                                    {auth?.is_loggedIn ? (
                                        <div className="cs_dropdown_wrap">
                                            <div
                                                onClick={handleProfileDropdownToggle}
                                                className={`cs_header_user_btn ${profileDropdownOpen ? "active" : ""}`}
                                            >
                                                <Icon icon="lucide:circle-user" width="20" height="20" />
                                            </div>
                                            {profileDropdownOpen && (
                                                <div className="cs_header_user_dropdown">
                                                    <div className="cs_header_user_info">
                                                        <img src={gravatarUrl(auth?.user?.email)} alt="" />
                                                        <h4 className="">{auth?.user?.name}</h4>
                                                        <p className="">{auth?.user?.email}</p>
                                                    </div>
                                                    <ul className="cs_header_user_list cs_mp0">
                                                        <li>
                                                            <Link href={route("user.dashboard")}>{translate("Dashboard")}</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={route("user.orders")}>{translate("My Orders")}</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={route("user.profile.edit")}>{translate("Profile")}</Link>
                                                        </li>
                                                        <li>
                                                            <a href="#" onClick={handleLogout}>
                                                                {translate("Log out")}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="cs_header_user_btn active d-flex">
                                            <Link href={route("login.create")}>{translate("Login")}</Link>
                                        </div>
                                    )}
                                    {Object.entries(lang.languages).length > 1 && <LanguageDropdown />}
                                    <button
                                        className="cs_hamburger_btn cs_hamburger_info_btn "
                                        onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
                                    >
                                        <span className="cs_hamburger_btn_in">
                                            <span />
                                            <span />
                                            <span />
                                            <span />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <SideHeader sideHeaderToggle={sideHeaderToggle} setSideHeaderToggle={setSideHeaderToggle} customize={customize} />
        </>
    )
}

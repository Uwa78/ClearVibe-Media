import React, { useEffect, useState, useRef } from "react"
import { Link, usePage } from "@inertiajs/react"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import MenuItem from "@/Admin/Components/Header/MenuItem"
import { useSelector } from "react-redux"
import translate from "@/utils/translate"
import SideHeader from "./SideHeader"
import GlobalSearch from "./GlobalSearch"
import LanguageDropdown from "./LanguageDropdown"
import { Icon } from "@iconify/react"
import gravatarUrl from "gravatar-url"

export default function Header4() {
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
                <div className="cs_top_header cs_accent_bg">
                    <div className="container">
                        <div className="cs_top_header_in">
                            <div className="cs_top_header_left">
                                <ul className="cs_header_contact_list cs_mp0">
                                    {customize?.contact?.contact_email && (
                                        <li>
                                            <i>
                                                <Icon icon="lucide:mail" width="18" height="18" />
                                            </i>
                                            <a href={`mailto:${translate(customize?.contact?.contact_email)}`}>
                                                {translate(customize?.contact?.contact_email)}
                                            </a>
                                        </li>
                                    )}
                                    {customize?.contact?.contact_phone_number && (
                                        <li>
                                            <i>
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 6.65367C6.162 6.65367 4.66667 8.15108 4.66667 9.99164C4.66667 11.8322 6.162 13.3296 8 13.3296C9.838 13.3296 11.3333 11.8322 11.3333 9.99164C11.3333 8.15108 9.838 6.65367 8 6.65367ZM8 11.9944C6.89733 11.9944 6 11.0958 6 9.99164C6 8.88744 6.89733 7.98886 8 7.98886C9.10267 7.98886 10 8.88744 10 9.99164C10 11.0958 9.10267 11.9944 8 11.9944ZM13.764 7.29456C15.0173 7.16037 16 6.10758 16 4.81845C16 3.8738 15.624 2.97589 14.938 2.28893C11.89 -0.763311 4.10867 -0.762644 1.062 2.28893C0.376 2.97589 0 3.8738 0 4.81778C0 6.10758 0.983333 7.16037 2.236 7.29456L0.862667 9.87348C0.298 10.9336 0 12.1286 0 13.3296C0 14.8023 1.196 16 2.66667 16H13.3333C14.804 16 16 14.8023 16 13.3296C16 12.1286 15.702 10.9336 15.1373 9.87348L13.764 7.29456ZM1.33333 4.81712C1.33333 4.22963 1.57067 3.66685 2.00467 3.23291C4.58267 0.652658 11.4187 0.652658 13.9953 3.23291C14.4287 3.66685 14.6673 4.22963 14.6667 4.81778C14.6667 5.46201 14.1433 5.98607 13.5 5.98607H13.044L12.526 5.12154C12.2493 4.6589 11.85 4.29773 11.3733 4.07809C10.62 3.73027 9.42333 3.31636 8 3.31636C6.57667 3.31636 5.38 3.73094 4.62733 4.07809C4.14933 4.29839 3.75067 4.6589 3.474 5.12154L2.956 5.98607H2.5C1.85667 5.98607 1.33333 5.46201 1.33333 4.81712ZM13.3333 14.6648H2.66667C1.93133 14.6648 1.33333 14.066 1.33333 13.3296C1.33333 12.3469 1.57733 11.3689 2.04 10.5024L3.91867 6.97478L4.61733 5.80783C4.756 5.57684 4.952 5.39792 5.186 5.29044C5.81733 4.9987 6.81867 4.65088 8.00067 4.65088C9.18267 4.65088 10.1833 4.9987 10.816 5.29044C11.0493 5.39792 11.2453 5.57684 11.384 5.80783L12.0827 6.97478L13.9613 10.5024C14.4233 11.3696 14.668 12.3476 14.668 13.3296C14.668 14.066 14.07 14.6648 13.3347 14.6648H13.3333Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </i>
                                            <a href={`tel:${translate(customize?.contact?.contact_phone_number)}`}>
                                                {translate(customize?.contact?.contact_phone_number)}
                                            </a>
                                        </li>
                                    )}
                                    {customize?.contact?.contact_address && (
                                        <li>
                                            <i>
                                                <Icon icon="lucide:map-pin" width="18" height="18" />
                                            </i>
                                            <p
                                                className="mb-0"
                                                dangerouslySetInnerHTML={{
                                                    __html: translate(customize?.contact?.contact_address)
                                                }}
                                            />
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="cs_top_header_right">
                                <div className="cs_header_social">
                                    {customize?.social_links?.social_list?.map((item, index) => (
                                        <a href={item?.social_url} target="_blank" key={index}>
                                            {item?.social_title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

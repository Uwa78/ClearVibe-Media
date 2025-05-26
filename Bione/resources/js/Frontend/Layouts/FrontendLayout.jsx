import Header from "@/Frontend/Components/Header/index.jsx"
import Footer from "@/Frontend/Components/Footer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
    updateContact,
    updateFooter,
    updateGeneral,
    updateSidebar,
    updateSocialLink,
    updateSubscribe
} from "@/Redux/features/pages/Customize/customize"
import Header2 from "../Components/Header/Header2"
import Header3 from "../Components/Header/Header3"
import Header4 from "../Components/Header/Header4"
import Footer2 from "../Components/Footer/Footer2"
import Header5 from "../Components/Header/Header5"
import Header6 from "../Components/Header/Header6"
import Header7 from "../Components/Header/Header7"
import Header8 from "../Components/Header/Header8"
import Header9 from "../Components/Header/Header9"
import Header10 from "../Components/Header/Header10"
import CookiePolicy from "../Components/Cookie/CookiePolicy"

export default function FrontendLayout({ children, headerLayout, footerLayout, cart }) {
    const dispatch = useDispatch()

    useEffect(() => {
        const customizeSettings = localStorage.getItem("customize_settings") ? JSON.parse(localStorage.getItem("customize_settings")) : []

        if (customizeSettings) {
            dispatch(updateGeneral(customizeSettings.general))
            dispatch(updateSidebar(customizeSettings.sidebar))
            dispatch(updateFooter(customizeSettings.footer))
            dispatch(updateContact(customizeSettings.contact))
            dispatch(updateSubscribe(customizeSettings.subscriber))
            dispatch(updateSocialLink(customizeSettings.social_links))
        }
    }, [dispatch])

    return (
        <>
            {headerLayout == "1" && <Header variant={true} />}
            {headerLayout == "2" && <Header2 />}
            {headerLayout == "3" && <Header3 />}
            {headerLayout == "4" && <Header4 />}
            {headerLayout == "5" && <Header5 />}
            {headerLayout == "6" && <Header6 />}
            {headerLayout == "7" && <Header7 />}
            {headerLayout == "8" && <Header8 />}
            {headerLayout == "9" && <Header9 />}
            {headerLayout == "10" && <Header10 />}
            {headerLayout === undefined && <Header variant={true} cart={cart} />}

            {children}

            {footerLayout == "1" && <Footer />}
            {footerLayout == "2" && <Footer2 />}
            {footerLayout === undefined && <Footer />}

            <CookiePolicy />
        </>
    )
}

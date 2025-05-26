import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import React from "react"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { useState } from "react"
import { router, Link } from "@inertiajs/react"
import { useDispatch } from "react-redux"
import { addCart } from "@/Redux/features/Cart/cart"
import translate from "@/utils/translate"
import Amount from "@/Components/Amount"
import BioneMeta from "@/utils/BioneMeta"
import PageHeading from "@/Frontend/Components/PageHeading"
import { Icon } from "@iconify/react"

const Index = ({
    products,
    tags,
    categories,
    search,
    filter,
    meta_title,
    title,
    meta_description,
    slug,
    max_price,
    meta_tags,
    meta_image,
    tagline,
    site_name
}) => {
    BioneMeta(meta_title ?? title, meta_title, meta_tags, meta_description, meta_image, site_name)
    const [range, setRange] = useState([filter.min_price, filter.max_price])
    const [searchQuery, setSearchQuery] = useState(search ?? "")
    const [sortValue, setSortValue] = useState(filter?.sort ?? "latest")
    const dispatch = useDispatch()
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}
    let pageHeaderData = {
        title: title,
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: title, url: route("pages.show", slug) }
        ]
    }
    const filteredCategories = categories?.map((item) => {
        return {
            title: item?.content?.title,
            products_count: item?.products_count,
            url: route("pages.show", {
                slug,
                filter: {
                    category: item?.content?.title,
                    sort: sortValue
                }
            })
        }
    })
    const handleSetRange = (range) => {
        setRange(range)
        router.get(
            route("pages.show", {
                slug,
                filter: {
                    min_price: range[0],
                    max_price: range[1],
                    sort: sortValue
                }
            })
        )
    }
    const filteredTags = tags.map((tag) => {
        return {
            title: tag,
            url: route("pages.show", {
                slug,
                search: searchQuery,
                filter: {
                    tag: tag,
                    sort: sortValue
                }
            })
        }
    })

    // handle search
    const handleSearch = (e) => {
        e.preventDefault()
        router.get(
            route("pages.show", {
                slug,
                search: searchQuery,
                filter: {
                    ...filter,
                    sort: sortValue
                }
            })
        )
    }

    //sorting data
    const handleSortChange = (e) => {
        const newSortValue = e.target.value
        setSortValue(newSortValue)

        const currentFilter = {
            ...filter,
            sort: newSortValue
        }

        router.get(
            route("pages.show", {
                slug,
                search: searchQuery,
                filter: currentFilter
            }),
            { preserveScroll: true }
        )
    }

    return (
        <FrontendLayout cart={true}>
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    data={pageHeaderData}
                    is_show_breadcrumb={true}
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.jpeg"}
                    variant="cs_type_1"
                />
            )}
            {/* Start Products  */}
            <div className="cs_height_100 cs_height_lg_80" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="cs_shop_sidebar">
                            <div className="cs_shop_sidebar_widget">
                                <form onSubmit={handleSearch} className="cs_shop_search">
                                    <input
                                        className="cs_shop_search_input"
                                        type="text"
                                        placeholder={`${translate("Search Products")}...`}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button type="submit" className="cs_shop_search_btn">
                                        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.6939 10.3222C11.5282 10.1562 11.3033 10.0629 11.0688 10.0629H10.8189C10.7506 10.0629 10.6849 10.0364 10.6357 9.98894C10.535 9.89181 10.5281 9.73333 10.6148 9.62352C11.416 8.60899 11.8925 7.33012 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.33012 11.8925 8.60899 11.416 9.62352 10.6148C9.73333 10.5281 9.89181 10.535 9.98894 10.6357C10.0364 10.6849 10.0629 10.7506 10.0629 10.8189V11.0688C10.0629 11.3033 10.1562 11.5282 10.3222 11.6939L13.9547 15.3191C14.3316 15.6953 14.942 15.695 15.3185 15.3185C15.695 14.942 15.6953 14.3316 15.3191 13.9547L11.6939 10.3222ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z"
                                                fill="#4F4747"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div className="cs_shop_sidebar_widget">
                                <h3 className="cs_shop_sidebar_widget_title">{translate("Categories")}</h3>
                                <ul className="cs_shop_sidebar_category_list">
                                    {filteredCategories.map((category) => (
                                        <li key={category.id}>
                                            <Link href={category.url}>
                                                {category.title} ({category.products_count < 10 && "0"}
                                                {category.products_count})
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {products?.data?.length > 1 && (
                                <div className="cs_shop_sidebar_widget">
                                    <h3 className="cs_shop_sidebar_widget_title">{translate("Price Filter")}</h3>
                                    <div className="st-range-slider-wrap">
                                        <div id="slider-range" />
                                        <div className="st-amount-wrap">
                                            <Slider range min={0} max={max_price} defaultValue={range} onChange={handleSetRange} />
                                        </div>
                                        <div className="items-center gap-4" style={{ marginTop: "10px" }}>
                                            <span>
                                                {translate("Selected Range")}: ${range[0]} - ${range[1]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="cs_shop_sidebar_widget">
                                <h3 className="cs_shop_sidebar_widget_title">{translate("Tags")}</h3>

                                <ul className="cs_shop_sidebar_tag_list">
                                    {filteredTags.map((tag, index) => (
                                        <li key={index}>
                                            <Link href={tag.url}>{tag.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="cs_height_0 cs_height_lg_60" />
                        <div className="cs_shop_filter_wrap">
                            <div className="cs_number_of_product">
                                {translate("Showing")} {products?.from}–{products?.to} of {products?.total} results
                            </div>
                            <form action="#" className="cs_shop_filter_form">
                                <select onChange={handleSortChange} value={sortValue}>
                                    <option value="latest">{translate("Sort by latest")}</option>
                                    <option value="low">{translate("Sort by low price")}</option>
                                    <option value="high">{translate("Sort by high price")}</option>
                                </select>
                            </form>
                        </div>
                        <div className="row">
                            {products?.data?.map((product, index) => (
                                <div key={index} className="col-lg-4 col-sm-6">
                                    <div className="cs_product_card cs_style_1">
                                        <div className="cs_product_thumb">
                                            <img src={product.thumbnail_image} alt={product.seo_title || "Product Image"} />
                                            <div className="cs_product_overlay" />
                                            {product.quantity === 0 ? (
                                                <div className="cs_out_of_stock_message">{translate("Out of Stock")}</div>
                                            ) : (
                                                <div className="cs_card_btns">
                                                    <a
                                                        href="javascript:void(0)"
                                                        onClick={() => {
                                                            dispatch(addCart(product))
                                                        }}
                                                    >
                                                        <svg
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g clipPath="url(#a1)">
                                                                <path
                                                                    d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z"
                                                                    fill="currentColor"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="a1">
                                                                    <rect width={24} height={24} fill="currentColor" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </a>
                                                    <Link href={`/product/${product.slug}`}>
                                                        <svg
                                                            width={22}
                                                            height={16}
                                                            viewBox="0 0 22 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <div className="cs_product_info">
                                            <h2 className="cs_product_title">
                                                <Link href={`/product/${product.slug}`}>{product?.content?.title}</Link>
                                            </h2>
                                            <p className="cs_product_price">
                                                {translate("Price")}:{" "}
                                                <span className="cs_present_price">
                                                    <Amount amount={product.discount_price ?? product.price} />
                                                </span>
                                                {product.discount_price && (
                                                    <span className="cs_discunt_price">
                                                        <Amount amount={product.price} />
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="cs_height_40 cs_height_lg_25" />
                                </div>
                            ))}
                            {products?.data?.length === 0 && (
                                <div className="col-lg-12">
                                    <div className="cs_product_not_found">
                                        {translate(
                                            "Oops! We couldn’t find anything for that. Maybe try a different keyword or browse our categories"
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {products.per_page < products.total && (
                            <ul className="cs_pagination_box cs_center cs_white_color cs_mp0">
                                {products?.links?.map((link, index) => (
                                    <React.Fragment key={index}>
                                        {link.url && (
                                            <li>
                                                <Link className={`cs_pagination_item cs_center ${link.active ? "active" : ""}`} href={link.url}>
                                                    {link.label === `Next &raquo;` ? (
                                                        <Icon icon="lucide:chevron-right" width="20" height="20" />
                                                    ) : link.label === `&laquo; Previous` ? (
                                                        <Icon icon="lucide:chevron-left" width="20" height="20" />
                                                    ) : (
                                                        `${link.label}`
                                                    )}
                                                </Link>
                                            </li>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="cs_height_100 cs_height_lg_80" />
            {/* End Products  */}
        </FrontendLayout>
    )
}

export default Index

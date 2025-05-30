export default function About2({ data }) {
    const { image_url, section_title, section_subtitle, section_description, feature_list } = data
    return (
        <div className="container">
            <div className="row cs_gap_y_40">
                <div className="col-xl-5 col-lg-6">{image_url && <img src={image_url} alt={section_title} />}</div>
                <div className="col-lg-6 offset-xl-1">
                    <div className="cs_section_heading cs_style_1">
                        {section_subtitle && (
                            <p
                                className="cs_section_subtitle cs_fs_18 cs_medium"
                                dangerouslySetInnerHTML={{
                                    __html: section_subtitle
                                }}
                            />
                        )}

                        {section_title && (
                            <>
                                <h2
                                    className="cs_section_title cs_fs_53 cs_normal mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_title
                                    }}
                                />
                                <div className="cs_height_26 cs_height_lg_20" />
                            </>
                        )}

                        {section_description && (
                            <>
                                <p
                                    className="mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_description
                                    }}
                                />
                                <div className="cs_height_30 cs_height_lg_30" />
                            </>
                        )}
                    </div>
                    <ul className="cs_list cs_style_1 cs_mp0">
                        {feature_list?.map((item, index) => (
                            <li key={index}>
                                {(item.feature_title || item.feature_subtitle) && (
                                    <i className="cs_tick_icon cs_accent_color d-flex">
                                        <svg width={18} height={17} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0 9.62275C0.0320847 8.83012 0.390363 8.2499 1.11227 7.93388C1.84487 7.61269 2.54004 7.73702 3.1443 8.25508C4.06406 9.0477 4.96777 9.85587 5.87684 10.6589C6.04796 10.8091 6.21908 10.9645 6.39554 11.1148C6.65757 11.3427 6.88751 11.3323 7.12279 11.0733C9.096 8.91819 11.0639 6.75789 13.0371 4.5976C14.3686 3.13668 15.7054 1.68094 17.037 0.220014C17.2027 0.0386945 17.3952 -0.0493752 17.6412 0.0283334C17.8498 0.0956808 18.0102 0.277001 17.9995 0.494585C17.9941 0.608557 17.946 0.732891 17.8819 0.831322C16.3685 3.19884 14.8552 5.56118 13.3419 7.92352C11.5986 10.6433 9.85534 13.3631 8.11207 16.0881C7.80727 16.5647 7.39551 16.8859 6.81264 16.974C6.15491 17.0776 5.60947 16.8704 5.19237 16.3782C3.69508 14.6116 2.20849 12.8399 0.716557 11.0681C0.433143 10.7469 0.133686 10.4257 0.0534744 9.98539C0.0267372 9.85587 0.0160423 9.73154 0 9.62275Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </i>
                                )}

                                {item.feature_title && (
                                    <h3
                                        className="cs_fs_24 cs_normal mb-0"
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_title
                                        }}
                                    />
                                )}
                                {item.feature_subtitle && (
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_subtitle
                                        }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

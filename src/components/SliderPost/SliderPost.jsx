import React, { useRef, useState, useEffect } from "react";
import "./SliderPost.css";

function SliderPost(props) {
    const { posts } = props;
    const sliderRef = useRef(null);
    const [isDynamic, setIsDynamic] = useState(false);

    useEffect(() => {
        if (posts.length < 5) { // Sesuaikan dengan jumlah postingan yang sedikit
            setIsDynamic(true);
        } else {
            setIsDynamic(false);
        }
    }, [posts.length]);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="slider-wrapper">
            <h2 className="slider-wrapper-title">Materi Terpopuler</h2>
            <button className="slider-nav slider-nav-left" onClick={scrollLeft}>
                &#8249;
            </button>
            <div
                className={`slider-container ${isDynamic ? "dynamic" : ""}`}
                ref={sliderRef}
            >
                {posts.map((post, index) => (
                    <div className={`slider-post ${isDynamic ? "dynamic" : ""}`} key={index}>
                        <img src={post.image} alt={post.title} className="slider-image"/>
                        <div className="slider-content">
                            <a href={post.url} className="slider-title-link">
                                <h3 className="slider-title">{post.title}</h3>
                            </a>
                            <div className="slider-info">
                                <span className="slider-subject">{post.subject}</span>
                                <span className="slider-grade-level">{post.gradeLevel}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="slider-nav slider-nav-right" onClick={scrollRight}>
                &#8250;
            </button>
        </div>
    );
}

export default SliderPost;

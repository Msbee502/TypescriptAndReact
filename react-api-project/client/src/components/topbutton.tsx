import {useEffect, useState} from "react";
import './topbutton.css'

const ScrollButton = () => {
    const [scrollToTopButton, setScrollToTopButton] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if(window.scrollY >300) {
          setScrollToTopButton(true)
        } else {
          setScrollToTopButton(false)
        }
      })
    }, [])

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };

    return (
      <div className = "topScroll-btn">
        {scrollToTopButton && (
          <button
            onClick={scrollTop}
          >
            Top
          </button>
        )}
      </div>         
    )
  }

  export default ScrollButton;
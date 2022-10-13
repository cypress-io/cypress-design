import * as React from 'react'
import clsx from 'clsx'
import { CssClasses } from '../constants'

export interface CarouselProps {
  children: React.ReactNode
}

export const Carousel: React.FC<
  CarouselProps & React.HTMLProps<HTMLDivElement>
> = ({ children, ...rest }) => {
  const slidesEl = React.useRef<HTMLUListElement | null>(null)
  const slideEl = React.useRef<HTMLLIElement | null>(null)
  const prevButton = React.useRef<HTMLDivElement | null>(null)
  const nextButton = React.useRef<HTMLDivElement | null>(null)
  const [slideWidth, setSlideWidth] = React.useState(0)

  React.useEffect(() => {
    if (slideEl.current) {
      setSlideWidth(slideEl.current.clientWidth)
    }

    if (nextButton.current) {
      nextButton.current.addEventListener('click', () => {
        if (slideWidth && slidesEl.current) {
          slidesEl.current.scrollLeft += slideWidth
        }
      })
    }

    if (prevButton.current && slideEl.current && slidesEl.current) {
      prevButton.current.addEventListener('click', () => {
        if (slideWidth && slidesEl.current) {
          slidesEl.current.scrollLeft -= slideWidth
        }
      })
    }
  })

  return (
    <div className={CssClasses.carousel}>
      <div
        ref={prevButton}
        className={clsx(CssClasses.navigationPrev, CssClasses.navigation)}
      >
        &laquo;
      </div>
      <div
        ref={nextButton}
        className={clsx(CssClasses.navigationNext, CssClasses.navigation)}
      >
        &raquo;
      </div>
      <ul ref={slidesEl} className={CssClasses.slides}>
        {React.Children.map(children, (child) => (
          <li ref={slideEl} className={CssClasses.slide}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Carousel

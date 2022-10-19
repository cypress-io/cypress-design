import * as React from 'react'
import clsx from 'clsx'
import { CssClasses } from '../constants'
import {
  IconChevronLeftLarge,
  IconChevronRightLarge,
} from '@cypress-design/react-icon'

export interface CarouselProps {
  children: React.ReactNode
  hasPagination?: boolean
  height?: number
}

export const Carousel: React.FC<
  CarouselProps & React.HTMLProps<HTMLDivElement>
> = ({ children, hasPagination, height, ...rest }) => {
  const slidesEl = React.useRef<HTMLUListElement | null>(null)
  const slideEl = React.useRef<HTMLLIElement | null>(null)
  const prevButton = React.useRef<HTMLDivElement | null>(null)
  const nextButton = React.useRef<HTMLDivElement | null>(null)
  const [slideWidth, setSlideWidth] = React.useState(0)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const slideCount: number = React.Children.count(children)

  const scrollToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
    const nextSlideIndex =
      slideIndex < 0
        ? slideCount - 1
        : slideIndex >= slideCount
        ? 0
        : slideIndex

    if (slideWidth && slidesEl.current) {
      slidesEl.current.scrollLeft = nextSlideIndex * slideWidth
    }
  }

  React.useEffect(() => {
    if (slideEl.current) {
      setSlideWidth(slideEl.current.clientWidth)
    }

    if (nextButton.current) {
      nextButton.current.addEventListener('click', () => {
        scrollToSlide(currentSlide + 1)
      })
    }

    if (prevButton.current && slideEl.current && slidesEl.current) {
      prevButton.current.addEventListener('click', () => {
        scrollToSlide(currentSlide - 1)
      })
    }
  })

  return (
    <div>
      <div
        className={CssClasses.carousel}
        style={{ height: height ? `${height}px` : 'auto' }}
      >
        <div
          ref={prevButton}
          className={clsx(CssClasses.navigationPrev, CssClasses.navigation)}
        >
          <IconChevronLeftLarge strokeColor="gray-700" className="" />
        </div>
        <div
          ref={nextButton}
          className={clsx(CssClasses.navigationNext, CssClasses.navigation)}
        >
          <IconChevronRightLarge strokeColor="gray-700" className="ml-2px" />
        </div>
        <ul ref={slidesEl} className={CssClasses.slides}>
          {React.Children.map(children, (child) => (
            <li ref={slideEl} className={CssClasses.slide}>
              {child}
            </li>
          ))}
        </ul>
      </div>
      {hasPagination && (
        <ul className={CssClasses.pagination}>
          {React.Children.map(children, (child, i) => (
            <li
              className={clsx(
                i === currentSlide ? CssClasses.paginationDotActive : '',
                CssClasses.paginationDot
              )}
              onClick={() => scrollToSlide(i)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Carousel

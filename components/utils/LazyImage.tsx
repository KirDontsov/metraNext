import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

type LazyImageProps = {
  image: string;
  className: string;
  alt: string;
  scrollPosition?: any;
};

const LazyImage: FC<LazyImageProps> = ({
  image,
  scrollPosition,
  className,
  alt,
}) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={image} // use normal <img> attributes as props
      className={className}
      effect="opacity"
      scrollPosition={scrollPosition}
      delayMethod="throttle"
      useIntersectionObserver={true}
    />
  );
};

export default LazyImage;

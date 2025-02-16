import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
interface ZoomableImageProps {
  src: string;
  alt: string;
}
export function ZoomableImage({
  src,
  alt
}: ZoomableImageProps) {
  return <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit={true}>
      <TransformComponent>
        <img src={src} alt={alt} className="w-full h-auto" />
      </TransformComponent>
    </TransformWrapper>;
}
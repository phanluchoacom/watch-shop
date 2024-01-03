"use client";

import {
  CartProductType,
  selectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import React from "react";

interface SetColorProps {
  images: selectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: selectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div
                key={image.color}
                onClick={() => handleColorSelect(image)}
                className={`
              w-7
              h-7
              rounded-full
              border-teal-300
              flex
              items-center
              justify-center
              ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }
              `}
              >
                <div
                  className="
                  h-5
                  w-5
                  rounded-full
                  border-[1.2px]
                  border-slate-300
                  cursor-pointer
                  "
                  style={{ background: image.colorCode }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;

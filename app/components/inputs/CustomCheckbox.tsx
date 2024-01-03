"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";
import React from "react";

interface CustomCheckBoxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CustomCheckbox: React.FC<CustomCheckBoxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div className="flex flex-row w-full gap-2 items-center">
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        className="cursor-pointer"
      />
      <label htmlFor={id} className="font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;

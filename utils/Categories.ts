import { MdStorefront } from "react-icons/md";
import {
  AiFillAlert,
  AiFillFlag,
  AiFillHeart,
  AiFillShopping,
  AiFillTrademarkCircle,
  AiFillWallet,
} from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Men's Watch",
    icon: AiFillWallet,
  },
  {
    label: "Women's Watch",
    icon: AiFillShopping,
  },
  {
    label: "Couple Watch",
    icon: AiFillHeart,
  },
  {
    label: "Omega Watch",
    icon: AiFillAlert,
  },
  {
    label: "Swiss Watch",
    icon: AiFillTrademarkCircle,
  },
  {
    label: "IWC Watch",
    icon: AiFillFlag,
  },
];

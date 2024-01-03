import Container from "@/app/components/Container";
import FooterList from "@/app/components/footer/FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">CUSTOMER HELP</h3>
            <Link href={"/"}>About us</Link>
            <Link href={"/"}>Privacy Policy</Link>
            <Link href={"/"}>Cookie Policy</Link>
            <Link href={"/"}>Sales policy</Link>
            <Link href={"/"}>After-sales policy</Link>
            <Link href={"/"}>Shipping policy</Link>
            <Link href={"/"}>Refund policy</Link>
            <Link href={"/"}>Watch warranty &amp; repair</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">LINK</h3>
            <Link href={"/"}>Trademark</Link>
            <Link href={"/"}>Men&apos;s watch</Link>
            <Link href={"/"}>Women&apos;s Watches</Link>
            <Link href={"/"}>Couple watch</Link>
            <Link href={"/"}>Sale</Link>
            <Link href={"/"}>Watch Set</Link>
            <Link href={"/"}>Limited Edition</Link>
            <Link href={"/"}>Event</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">SWITCHBOARD</h3>
            <Link href={"/"}>Shopping Advice</Link>
            <Link href={"/"}>1800 0091</Link>
            <Link href={"/"}>028 3833 9999</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">FOLLOW US</h3>
            <div className="flex gap-2">
              <Link href={"/"}>
                <MdFacebook size={24} />
              </Link>
              <Link href={"/"}>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href={"/"}>
                <AiFillInstagram size={24} />
              </Link>
              <Link href={"/"}>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

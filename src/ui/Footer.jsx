import { ShieldCheck, Lock, MessageCircle, Smartphone } from "lucide-react";
import {
  card,
  cod,
  face,
  insta,
  master,
  telegram,
  visa,
  whatsapp,
  youtube,
} from "../assets/footer";

const Footer = () => {
  return (
    <footer className="bg-white max-w-[1400px] mx-auto w-full px-4 lg:px-8 mt-20">
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8 border-b">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-rose-500" />
          </div>
          <h3 className="font-semibold mb-2">100% SECURE PAYMENTS</h3>
          <p className="text-sm text-gray-500">
            Moving your card details to a much more secured place
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-emerald-500" />
          </div>
          <h3 className="font-semibold mb-2">TRUSTPAY</h3>
          <p className="text-sm text-gray-500">
            100% Payment Protection. Easy Return Policy
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <MessageCircle className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="font-semibold mb-2">HELP CENTER</h3>
          <p className="text-sm text-gray-500">
            Got a question? Look no further. Browse our FAQs or submit your
            query here.
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Smartphone className="w-12 h-12 text-gray-700" />
          </div>
          <h3 className="font-semibold mb-2">SHOP ON THE GO</h3>
          <p className="text-sm text-gray-500">
            Download the app and get exciting app-only offers at your fingertips
          </p>
        </div>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-8">
        <div>
          <h4 className="font-semibold mb-4">POLICY INFO</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Sale</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Report Abuse & Takedown Policy</a>
            </li>
            <li>
              <a href="#">Know Your BIS Standard</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">COMPANY</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Sitemap</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">SNAPDEAL BUSINESS</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#">Shopping App</a>
            </li>
            <li>
              <a href="#">Sell on Snapdeal</a>
            </li>
            <li>
              <a href="#">Media Enquiries</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">POPULAR LINKS</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#">Lehenga</a>
            </li>
            <li>
              <a href="#">Kids Clothing</a>
            </li>
            <li>
              <a href="#">Sarees</a>
            </li>
            <li>
              <a href="#">Winter Wear</a>
            </li>
            <li>
              <a href="#">Sweatshirts</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">SUBSCRIBE</h4>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 border rounded"
            />
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded">
              SUBSCRIBE
            </button>
            <p className="text-sm text-gray-600">
              Register now to get updates on promotions and coupons.
              <a href="#" className="text-blue-500">
                {" "}
                Or Download App
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Payment and Connect Section */}
      <div className="border-t p-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h4 className="font-semibold mb-4">PAYMENT</h4>
            <div className="flex gap-4">
              <img src={visa} alt="visa" className="w-10 h-6 rounded" />
              <img src={master} alt="master" className="w-10 h-6 rounded" />
              <img src={card} alt="card" className="w-10 h-6 rounded" />
              <img src={cod} alt="cod" className="w-10 h-6 rounded" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">CONNECT</h4>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden">
                <img src={telegram} alt="telegram" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden">
                <img src={youtube} alt="youtube" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden">
                <img src={insta} alt="instagram" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden">
                <img src={face} alt="facebook" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full overflow-hidden">
                <img src={whatsapp} alt="whatsapp" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// export default Footer;

export default Footer;

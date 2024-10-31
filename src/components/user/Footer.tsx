import startGroup from "../../assets/icons/startGroup.svg";
import startText from "../../assets/icons/startText.png";
import social from "../../assets/icons/Social.svg";
import payMethod from "../../assets/icons/payMethod.svg";

const Footer = () => {
    return (
        <footer className="bg-[#131717] text-white">
            <div className="container">
                {/* footer top */}
                <section className="flex flex-col gap-[12px] items-center py-[55px]">
                    <p className="text-[20px] font-bold mb-2">Excellent</p>
                    <div>
                        <img src={startGroup} alt="" />
                    </div>
                    <p className="text-[18px] leading-[166.667%]">
                        Based on <span className="underline">13,586 reviews</span>
                    </p>
                    <div>
                        <img src={startText} alt="" />
                    </div>
                </section>
                <div className="bg-[#404B4B] h-[1px] w-full"></div>

                {/* footer main */}
                <section className="grid grid-cols-1 gap-[30px] sm:grid-cols-5 mt-[55px]">
                    <article className="mr-auto">
                        <h3 className="font-bold text-[20px] leading-[150%]">Customer Service</h3>
                        <ul className="mt-[16px] text-[#A6B6B6]">
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Contact Us</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">FAQs</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Order Lookup</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Returns</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Shipping & Delivery</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Corporate Gifting</a>
                            </li>
                        </ul>
                    </article>
                    <article>
                        <h3 className="font-bold text-[20px] leading-[150%]">About Us</h3>
                        <ul className="mt-[16px] text-[#A6B6B6]">
                            <li className="py-[8px] hover:underline">
                                <a href="#!">Careers</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">News & Blog</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Press Center</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Investors</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Suppliers</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Terms & Conditions</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Privacy Policy</a>
                            </li>
                        </ul>
                    </article>
                    <article>
                        <h3 className="font-bold text-[20px] leading-[150%]">Credit Card</h3>
                        <ul className="mt-[16px] text-[#A6B6B6]">
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Gift Cards</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Gift Cards Balance</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Shop with Points</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Reload Your Balance</a>
                            </li>
                        </ul>
                    </article>
                    <article>
                        <h3 className="font-bold text-[20px] leading-[150%]">Sell</h3>
                        <ul className="mt-[16px] text-[#A6B6B6]">
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Start Selling</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Learn to Sell</a>
                            </li>
                            <li className="hover:underline py-[8px]">
                                <a href="#!">Affiliates & Partners</a>
                            </li>
                        </ul>
                    </article>
                    <article>
                        <h3 className="font-bold text-[20px] leading-[150%]">Follow us</h3>
                        <ul className="mt-[16px] text-[#A6B6B6]">
                            <li className="py-[8px] cursor-pointer">
                                <img src={social} />
                            </li>
                        </ul>
                    </article>
                </section>

                {/* footer bottom */}
            </div>
            <div className="py-[20px] mt-[30px] lg:py-[28px] bg-[#F1DEB4] text-black">
                <div className="container mx-auto flex flex-wrap justify-between items-center">
                    <a href="/">
                        <span className="font-itim text-[30px] font-semibold">Top Deal</span>
                    </a>
                    <div className="flex justify-center items-center">
                        <img src={payMethod} alt="Payment Method" />
                    </div>
                    <p className="mt-[10px] lg:mt-0">Copyright © 2022 TopDeal All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;

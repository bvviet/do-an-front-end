import { useState } from "react";

export default function FAQComponents() {
    const [openIndices, setOpenIndices] = useState<number[]>([]);
    const [viewMore, setViewMore] = useState(false);

    const toggleAccordion = (index: number) => {
        if (openIndices.includes(index)) {
            setOpenIndices(openIndices.filter((i) => i !== index)); // Đóng nếu mục đã mở
        } else {
            setOpenIndices([...openIndices, index]); // Mở mục mới
        }
    };

    const toggleViewMore = () => {
        setViewMore(!viewMore);
    };

    const faqItems = [
        {
            question: "Can I create ads for different platforms using ABQ only?",
            answer: "By easily connecting your different ad accounts to WASK, you can publish your ads from a single screen.",
        },
        {
            question: "How can I contact customer support?",
            answer: "To contact customer support, look for a contact form on the support page.",
        },
        {
            question: "Is it any limit on the number of publishing ads in ABQ?",
            answer: 'You can reset your password by clicking on "Forgot password" on the login page.',
        },
        {
            question: "Can I use my own images in my designs?",
            answer: 'You can reset your password by clicking on "Forgot password" on the login page.',
        },
        {
            question: "How can I cancel my subscription?",
            answer: 'You can reset your password by clicking on "Forgot password" on the login page.',
        },
        {
            question: "How can I manage my inefficient ads that I have identified with A/B testing?",
            answer: 'You can reset your password by clicking on "Forgot password" on the login page.',
        },
        {
            question: "How do I update my profile information?",
            answer: "You can update your profile information from the profile settings page.",
        },
        {
            question: "How do I find my purchase history?",
            answer: "Your purchase history can be found under the orders section in your account.",
        },
        {
            question: "How can I reset my password?",
            answer: 'You can reset your password by clicking on "Forgot password" on the login page.',
        },
        {
            question: "How does creating ads with ABQ help me in my advertising processes?",
            answer: 'You can reset your password by clicking on "Forgot password" on the login page.',
        },
    ];

    const visibleItems = viewMore ? faqItems : faqItems.slice(0, 5);

    return (
        <section className="py-[100px] max-sm:py-24">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-[58px] max-sm:text-[34px] font-slab text-center font-bold leading-[117.241%]">
                        Frequently asked questions
                    </h2>
                </div>

                <div className="accordion-group">
                    {visibleItems.map((item, index) => (
                        <div
                            key={index}
                            className="accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-50"
                        >
                            <button
                                className="accordion-toggle group inline-flex items-center justify-between leading-8 text-[#131717] w-full transition duration-500 text-left hover:text-[#005D63]"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openIndices.includes(index)}
                            >
                                <h5 className="max-sm:text-[14px] max-sm:w-[304px]">{item.question}</h5>
                                {openIndices.includes(index) ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                    >
                                        <path
                                            d="M15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25Z"
                                            stroke="#131717"
                                            strokeWidth="1.3"
                                            strokeMiterlimit="10"
                                        />
                                        <path
                                            d="M10.3125 15H19.6875"
                                            stroke="#131717"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.10156 14.9996C3.10156 8.42742 8.42937 3.09961 15.0016 3.09961C21.5738 3.09961 26.9016 8.42742 26.9016 14.9996C26.9016 21.5718 21.5738 26.8996 15.0016 26.8996C8.42937 26.8996 3.10156 21.5718 3.10156 14.9996Z"
                                            fill="#005D63"
                                        />
                                        <path
                                            d="M10.3125 15H19.6875"
                                            stroke="white"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M15 10.3125V19.6875"
                                            stroke="white"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                            <div
                                className={`accordion-content w-full px-0 overflow-hidden transition-max-height duration-500 ease-in-out ${
                                    openIndices.includes(index) ? "max-h-[500px]" : "max-h-0"
                                }`}
                            >
                                <p className="text-[17px] max-sm:text-[12px] max-sm:max-w-[304px] font-normal font-manrope  text-[#566363] leading-[152.941%] py-4">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={toggleViewMore}
                        className="bg-[#005D63] text-white px-7 py-[17px] font-normal leading-[141.176%] max-sm:px-5 max-sm:py-[14px] max-sm:text-lg rounded transition duration-300 hover:bg-[#214748]"
                    >
                        {viewMore ? "Hidden All" : "Show More"}
                    </button>
                </div>
            </div>
        </section>
    );
}

import axios from "axios";
import { useState } from "react";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BannerContact from "./banner";
import "./contact.css"
import Map from "./map";
export default function Contacts() {
    const [formData] = useState({
        ten: "",
        email: "",
        about: "",
        message: "",
    });

    const handleSubmit = async (values: typeof formData) => {
        const formData = new FormData();
        formData.append('entry.242006219', values.ten);
        formData.append('entry.1217648754', values.email);
        formData.append('entry.1488967380', values.about);
        formData.append('entry.1439108955', values.message);

        try {
            await axios.post("https://docs.google.com/forms/d/e/1FAIpQLSdX1H-Hi2BT3BlGc7Fqnt4UF03WRcy8ztWVpJWmvLE6yoCYag/formResponse", formData);


        } catch (error) {
            console.error("Error submitting form", error);
            toast.success("Gửi thành công");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    const validate = (values: typeof formData): ValidationErrors => {
        const { ten, about, email, message } = values;
        const errors: ValidationErrors = {};

        if (!ten) errors.ten = "Vui lòng điền đầy đủ họ tên của mình";
        if (!email) errors.email = "Vui lòng diền email";
        if (!about) errors.about = "Vui lòng điền cách mà bạn biết đến chúng tôi";

        if (!message) errors.message = "Vui lòng nhập ý kiến";

        return errors;
    };

    return (
        <>
            <BannerContact
                title="Contact Us"
                subtitle="Let’s talk about how we can help your startup scale" />
            <div className="container isolate  w-[1440px] max-xl:w-full  mx-auto my-24 ">
                <ToastContainer />
                <div className=" mx-auto max-sm:mx-4 text-center w-[642px] max-md:w-auto">
                    <p className="mt-2 text-2xl font-manrope leading-8 text-[#566363]">
                        Submit the form and if we think we can help, we’d love to discuss
                        further. Or if you need more info on what we can do for you, or
                        whether we can help, our FAQs on working with us might help.
                    </p>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    validate={validate}
                    initialValues={formData}
                    render={({ handleSubmit, submitting }) => (
                        <form
                            onSubmit={handleSubmit}
                            method="POST"
                            className="mx-auto mt-16 w-[706px] max-sm:w-[380px] max-md:mx-4 sm:mt-20"
                        >
                            <div className="grid grid-cols-1 gap-x-[42px] gap-y-12 sm:grid-cols-2 ">
                                <Field name="ten">
                                    {({ input, meta }) => (
                                        <div>
                                            <label
                                                htmlFor="ten"
                                                className="block text-xl font-manrope font-medium  text-[#051023]"
                                            >
                                                FullName
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    {...input}
                                                    type="text"
                                                    className="block w-full max-sm:text-[14px] rounded-md border-0 px-3.5 py-4 text-[#051023] shadow-sm ring-2 ring-inset ring-[#051023]"
                                                />
                                                {meta.touched && meta.error && (
                                                    <small className="text-red-600">{meta.error}</small>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Field>
                                <Field name="email">
                                    {({ input, meta }) => (
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-xl font-manrope font-medium  text-[#051023]"
                                            >
                                                Work E-mail
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    {...input}
                                                    type="email"
                                                    className="block w-full max-sm:text-[14px] rounded-md border-0 px-3.5 py-4 text-[#051023] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                                />
                                                {meta.touched && meta.error && (
                                                    <small className="text-red-600">{meta.error}</small>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Field>

                                <Field name="about">
                                    {({ input, meta }) => (
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="phone-number"
                                                className="block text-xl font-manrope font-medium text-[#051023]"
                                            >
                                                How did you hear about us?
                                            </label>
                                            <div className="relative mt-2.5">
                                                <input
                                                    {...input}
                                                    type="text"
                                                    className="block w-full max-sm:text-[14px] rounded-md border-0 px-3.5 py-4 text-[#051023] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                                />
                                                {meta.touched && meta.error && (
                                                    <small className="text-red-600">{meta.error}</small>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Field>
                                <Field name="message">
                                    {({ input, meta }) => (
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="message"
                                                className="block text-xl  font-manrope font-medium  text-[#051023]"
                                            >
                                                Message
                                            </label>
                                            <div className="mt-2.5">
                                                <textarea
                                                    {...input}
                                                    rows={2}
                                                    className="block w-full max-sm:text-[14px] rounded-md border-0 px-3.5 py-4 text-[#051023] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                                />
                                                {meta.touched && meta.error && (
                                                    <small className="text-red-600">{meta.error}</small>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="block w-full rounded-md bg-[#005D63]  py-6 text-center text-2xl  text-white shadow-sm hover:bg-[#528a8f]"
                                >
                                    Contact
                                </button>
                            </div>
                        </form>
                    )}
                />
                <Map />
            </div>
        </>
    );
}

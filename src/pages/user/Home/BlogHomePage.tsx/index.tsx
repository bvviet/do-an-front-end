import BaseSection from "../BaseSection";
import BlogHomeItem from "./BlogHomeItem";

const BlogHomePage = () => {
    return (
        <div className="container">
            <BaseSection
                typeProduct={true}
                title="Learn how to build and grow your online store"
                description="Get insider tips and step-by-step guidance from eCommerce experts and successful Wix Merchants."
            >
                <BlogHomeItem
                    imgUrl="https://images.unsplash.com/photo-1659540503054-ddd87ba4bcdc?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="How to start an online store"
                />
                <BlogHomeItem
                    imgUrl="https://images.unsplash.com/photo-1719937051529-e72f4f552a59?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="7 examples of the best eCommerce websites to take notes from"
                />
                <BlogHomeItem
                    imgUrl="https://media.istockphoto.com/id/1127765143/vi/anh/ch%E1%BB%A5p-%E1%BA%A3nh-ho%C3%A0ng-h%C3%B4n-t%E1%BA%A1i-s%C3%B4ng-ijssel-v%C3%A0o-m%C3%B9a-xu%C3%A2n.jpg?s=612x612&w=0&k=20&c=uPRQ3IvoTgg2kL50Rp0q7KeZzz1XZaBMpUDgkkeLLUo="
                    title="How to start a t-shirt business: ultimate step-by-step guide"
                />
            </BaseSection>
        </div>
    );
};
export default BlogHomePage;

import BlogCompoment from "@/components/blog/blog";
import Featured from "@/components/blog/feartured";
import BannerContact from "@/components/contacts/banner";



export default function Blog() {
    return <>
        <BannerContact
            title="Read our latest blog"
            subtitle="We provide actionable insights to help you stay on the cutting edge of ecommerce. Join our thought leadership community to get ecommerce tips right to your inbox"
        />
        <div className="container mx-auto mb-12">
            <Featured />
            <BlogCompoment />
          
        </div>
    </>
}
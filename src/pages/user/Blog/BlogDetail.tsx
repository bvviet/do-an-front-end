import DetailBlog from "@/components/blog/blogDetail";
import RelatedBlog from "@/components/blog/relatedBlogs";


export default function BlogDetail() {
    return <>
        <div className="container">
            <DetailBlog />
            <div className="mb-36">
                <RelatedBlog />
            </div>
        </div>
    </>
}
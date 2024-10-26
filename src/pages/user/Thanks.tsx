import ThankCompoment from "@/components/Thanks/ThanksComponent";
import ProductNew from "./Home/ProductNew/ProductNew";
import { useGetAllProductsQuery } from "@/services/productApi";

export default function Thanks() {
    const { data: products } = useGetAllProductsQuery();
    console.log({ products });

    return <>
        <div className="container">
            <ThankCompoment />
            <ProductNew products={products} />
        </div>
    </>
}
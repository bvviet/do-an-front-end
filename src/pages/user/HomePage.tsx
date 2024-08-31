import Confirm from "../../components/Confirm";
import ProductItem from "../../components/user/Product";
import { useModalContext } from "../../contexts/ModelPopUp/ModelProvider";

const HomePage = () => {
    const { openPopup } = useModalContext();
    return (
        <div className="container">
            <p onClick={() => openPopup(<Confirm />)}>Xac nhan</p>
            <ProductItem />
        </div>
    );
};
export default HomePage;

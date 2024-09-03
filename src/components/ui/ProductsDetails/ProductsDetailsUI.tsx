import { useEffect, useState } from "react";
import { useGetProductsByIdQuery } from "../../../redux/Feature/products/productsApi";

import { useAddToCartMutation } from "../../../redux/Feature/Cart/cartApi";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const ProductsDetailsUI = () => {
  const { id } = useParams();
  const { data, refetch } = useGetProductsByIdQuery(id!, { skip: !id });
  const [pro, setPro] = useState<any>();
  const loginUser = useAppSelector((state: RootState) => state.auth.user);

  const [addToCart,{isLoading}] = useAddToCartMutation();
  const [proId, setProId] = useState(1);
  useEffect(() => {
    refetch();
    setPro(data?.data);
  }, [data?.data, proId]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handelAddToCart = async (
    productId: string,
    name: string,
    productQuantity: any,
    image: string,
    price: any
  ) => {
    addToCart({
      productQuantity,
      name,
      price,
      productId,
      image,
      quantity: 1,
      user: loginUser?.email as string,
    });
    setProId(proId + 1);
    toast("Add to cart successful");
    setCart((prevCart: any) => {
      const productExists = prevCart.find((item: any) => item.id === productId);

      if (productExists) {
        return prevCart.map((item: any) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };

  return (
    <div className="p-3">
      <ToastContainer />

      <div className="">
        <div className="border border-black relative h-[320px] rounded-lg p-3 cursor-pointer w-fit mx-auto mt-5 ">
          <img
            className="w-[100px] mx-auto h-[100px]"
            src={pro?.image}
            alt=""
          />
          <div className="text-center text-gray-950">
            <h1>Name: {pro?.name}</h1>
            <h1>price: ${pro?.price}</h1>
            <h1>Quantity: {pro?.quantity}</h1>
            <h1>Categories:{pro?.categories[0]}</h1>
            <h1> {pro?.description.slice(0, 150)}</h1>
          </div>

          <button
            disabled={pro?.availableQuantity === pro?.quantity || isLoading}
            onClick={() =>
              handelAddToCart(
                pro?._id,
                pro?.name,
                pro?.quantity,
                pro?.image,
                pro?.price
              )
            }
            className="bg-emerald-700 w-[90%] rounded text-white absolute bottom-2 text-center "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailsUI;

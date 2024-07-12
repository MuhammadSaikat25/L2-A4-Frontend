import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../../redux/Feature/products/productsApi";
import { TProducts } from "../../../@types/Products";
import { useAddToCartMutation } from "../../../redux/Feature/Cart/cartApi";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsDetailsUI = () => {
  const [pro, setPro] = useState([]);
  const [productId,setProductId]=useState('')
  const loginUser = useAppSelector((state: RootState) => state.auth.user);
  const { data } = useGetProductsQuery(undefined);
  const [addToCart] = useAddToCartMutation();
  const [proId, setProId] = useState(1);
  useEffect(() => {
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

  const handelAddToCart = async (productId: string, name: string) => {
    setProductId(productId)
    addToCart({
      name,
      productId,
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
  let localData=localStorage.getItem('cart')
  // let a=localData.filter()
  console.log(localData)
  return (
    <div className="">
      <ToastContainer />
      <div className="grid grid-cols-3 mt-2 mx-auto gap-3 lg:w-[1200px] mb-3">
        {pro?.map((data: TProducts, i: number) => (
          <div key={i} className="relative">
            <div className="border border-black relative h-[320px] rounded-lg p-3 cursor-pointer">
              <img
                className="w-[100px] mx-auto h-[100px]"
                src={data.image}
                alt=""
              />
              <div className="text-center text-gray-950">
                <h1>Name: {data.name}</h1>
                <h1>price: ${data.price}</h1>
                <h1>Quantity: {data.quantity}</h1>
                <h1>Categories:{data.categories[0]}</h1>
                <h1> {data.description.slice(0, 150)}</h1>
              </div>
              <button
                disabled={data.availableQuantity === data.quantity}
                onClick={() => handelAddToCart(data._id, data.name)}
                className="bg-emerald-700 w-[90%] rounded text-white absolute bottom-2 text-center "
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsDetailsUI;

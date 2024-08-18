import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import {
  useDecrementMutation,
  useDeleteUserCartDataMutation,
  useGetUserCartQuery,
  useIncrementMutation,
} from "../../../redux/Feature/Cart/cartApi";
import { TCart } from "../../../@types/carts";
import { RootState } from "../../../redux/store";
import { useCheckoutMutation } from "../../../redux/Feature/checkout/checkoutApi";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const CartUI = () => {
  const loginUser = useAppSelector((state: RootState) => state.auth.user);
  const { data, refetch } = useGetUserCartQuery(loginUser!.email);
  const [deleteUserCartData, { reset }] = useDeleteUserCartDataMutation();
  const [increment, { isLoading: incLoading }] = useIncrementMutation();
  const [decrement, { isLoading: decLoading }] = useDecrementMutation();
  const [checkout] = useCheckoutMutation();
  const [cart, setCart] = useState<TCart[]>([]);
  const [deleteModal, setDeleteModal] = useState("");
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const handleIncrement = async (index: number, id: string) => {
    setLoadingProductId(id);
    await increment(id);
    refetch();
    const updatedCart = [...cart];
    updatedCart[index].quantity++;
    setCart(updatedCart);
    setLoadingProductId(null);
  };

  const handleDecrement = async (index: number, id: string) => {
    setLoadingProductId(id);
    await decrement(id);
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      refetch();
    }
    setCart(updatedCart);
    setLoadingProductId(null);
  };

  const handleRemoveItem = (index: any) => {
    setDeleteModal(index);
    refetch();
  };

  useEffect(() => {
    refetch();
    setCart(
      data?.data.map((product: any) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        productQuantity: product.productQuantity,
        user: product.user,
        _id: product._id,
        productId: product.productId,
      }))
    );
  }, [data?.data]);

  const Price = cart?.reduce((pre, curr) => pre + curr.price, 0);
  const quantity = cart?.reduce((pre, curr) => pre + curr.quantity, 0);

  const deleteCartFormBD = async (id: string) => {
    await deleteUserCartData({ id, user: loginUser?.email });
    refetch();
    reset();
  };

  const checkoutHandler = () => {
    const checkoutData = [...cart];
    checkout(checkoutData);
  };

  return (
    <div className="">
      {cart?.length ? (
        <div className="cart-container p-3 ]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-[90%] mx-auto">
            {cart?.map((item, index) => (
              <div
                key={item.id}
                className="cart-item rounded-md border p-2 bg-[#EEEDEB] relative"
              >
                <img
                  className="w-[100px] mx-auto "
                  src={item.image}
                  alt={item.name}
                />

                {loadingProductId === item.id && (
                  <span className="absolute top-[20%] left-[30%] bg-[#F8F6E3] pt-1 w-fit px-1 rounded-2xl">
                    <BeatLoader color="#FF6868" />
                  </span>
                )}
                <div className="item-details text-center">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>

                  <div className="flex items-center gap-4 justify-center ">
                    <button
                      disabled={decLoading || item.quantity===1}
                      className="text-2xl"
                      onClick={() => handleDecrement(index, item._id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      disabled={
                        item.quantity === item.productQuantity || incLoading
                      }
                      className="text-2xl"
                      onClick={() => handleIncrement(index, item._id)}
                    >
                      +
                    </button>
                  </div>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => handleRemoveItem(item._id)}>
                    Remove
                  </button>
                  {deleteModal === item.id && (
                    <div className="modal absolute top-[30%]  flex items-center gap-3 bg-slate-800 text-white p-2 rounded-md">
                      <button onClick={() => deleteCartFormBD(item._id)}>
                        Sure
                      </button>
                      <button onClick={() => handleRemoveItem(null)}>No</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <h1 className="bg-red-600 lg:w-[400px] text-center p-1 rounded mx-auto mt-7 cursor-pointer text-white">
            <Link to={"/checkout"} onClick={() => checkoutHandler()}>
              Proceed to checkout ${(quantity * Price).toFixed(2)}
            </Link>
          </h1>
        </div>
      ) : (
        <h1 className="flex items-center justify-center mt-5">No data found</h1>
      )}
    </div>
  );
};

export default CartUI;

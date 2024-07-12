import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import {
  useDecrementMutation,
  useDeleteCartMutation,
  useGetUserCartQuery,
  useIncrementMutation,
} from "../../../redux/Feature/Cart/cartApi";
import { TCart } from "../../../@types/carts";
import { RootState } from "../../../redux/store";

const CartUI = () => {
  const loginUser = useAppSelector((state: RootState) => state.auth.user);
  const { data, refetch } = useGetUserCartQuery(loginUser!.email);
  const [deleteCart] = useDeleteCartMutation();
  const [increment] = useIncrementMutation();
  const [decrement] = useDecrementMutation();
  const [cart, setCart] = useState<TCart[]>([]);
  const [deleteModal, setDeleteModal] = useState("");

  const handleIncrement = (index: number, id: string) => {
    increment(id);
    refetch();
    const updatedCart = [...cart];
    updatedCart[index].quantity++;
    setCart(updatedCart);
  };

  const handleDecrement = (index: any, id: string) => {
    decrement(id);
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      refetch();
    } else {
      // Handle removing item from cart if quantity reaches 0
      // updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  const handleRemoveItem = (index: any) => {
    // const updatedCart = [...cart];
    // updatedCart.splice(index, 1);
    // setCart(updatedCart);
    setDeleteModal(index);
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
      }))
    );
  }, [data?.data]);
  const Price = cart?.reduce((pre, curr) => pre + curr.price, 0);
  const quantity = cart?.reduce((pre, curr) => pre + curr.quantity, 0);

  const deleteCartFormBD = (id: string) => {
    deleteCart(id);
    refetch();
  };
  return (
   <div className="">
    {
      cart?.length ? <div className="cart-container p-3 relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-[90%] mx-auto">
        {cart?.map((item, index) => (
          <div
            key={item.id}
            className="cart-item rounded-md border p-2 mx-a bg-gray-300"
          >
            <img
              className="w-[100px] mx-auto"
              src={item.image}
              alt={item.name}
            />
            <div className="item-details  text-center">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>

              <div className="flex items-center gap-4 justify-center ">
                <button
                  className="text-2xl"
                  onClick={() => handleDecrement(index, item._id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  disabled={item.quantity === item.productQuantity}
                  className="text-2xl"
                  onClick={() => handleIncrement(index, item._id)}
                >
                  +
                </button>
              </div>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
              {deleteModal === item.id && (
                <div className="modal absolute top-[300px] left-[750px] flex items-center gap-3 bg-slate-800 text-white p-2 rounded-md">
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
      <h1 className="bg-red-600 lg:w-[400px] text-center p-1 rounded mx-auto mt-4 cursor-pointer text-white">
        Proceed to checkout ${(quantity * Price).toFixed(2)}
      </h1>
    </div>: <h1 className="flex items-center justify-center mt-5">No data found</h1>
    }
   </div>
  );
};

export default CartUI;

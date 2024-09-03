import { useEffect, useState } from "react";
import { useGetUserCheckoutDataQuery } from "../../../redux/Feature/checkout/checkoutApi";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { TCart } from "../../../@types/carts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePostOrderMutation } from "../../../redux/Feature/Order/orderApi";
import { useNavigate } from "react-router-dom";

const CheckoutUI = () => {
  const loginUser = useAppSelector((state: RootState) => state.auth.user);
  const { data, refetch } = useGetUserCheckoutDataQuery(loginUser?.email);
  const [cart, setCart] = useState<TCart[]>([]);
  const [postOrder] = usePostOrderMutation();
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
    if (data) {
      setCart(data?.data);
    }
  }, [data, refetch]);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cashOnDelivery === false) {
      return toast("please select payment method");
    }
    postOrder({
      user: {
        email: loginUser?.email,
        name,
        phone,
        address,
        total_cost: Number(Price * quantity),
      },
      product: cart,
      payments_type: "Cash on delivery",
    });
    toast("Order has been Booked");
    navigate("/success");
  };

  const Price = cart?.reduce((pre, curr) => pre + curr.price, 0);
  const quantity = cart?.reduce((pre, curr) => pre + curr.quantity, 0);

  return (
    <div className="p-3">
      <ToastContainer />

      <div className="max-w-md mx-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={loginUser?.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-2">
            <div>
              <input
                type="checkbox"
                name="Cash on delivery"
                id="payment"
                checked={cashOnDelivery}
                onChange={(e) => setCashOnDelivery(e.target.checked)}
                className="mb-5"
              />
              <label htmlFor="payment">Cash on delivery</label>
            </div>
            <h1>Total Cost: ${(Price * quantity || 0).toFixed(2)}</h1>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={cart?.length === 0}
              className="px-6 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutUI;

[
  {
    id: 2,
    quantity: 3,
  },
  {
    id: 1,
    quantity: 7,
  },
  {
    id: 8,
    quantity: 2,
  },
];

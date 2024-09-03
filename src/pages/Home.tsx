import Banner from "../components/ui/Home/Banner";
import CatagoriesUl from "../components/ui/Home/CatagoriesUl";
import Image from "../components/ui/Home/image/Image";

import { useGetProductsQuery } from "../redux/Feature/products/productsApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data } = useGetProductsQuery(undefined);

  const navigate = useNavigate();

  const handelDetails = (id: string) => {
    navigate(`/productsDetails/${id}`);
  };
  return (
    <div>
      <Banner />
      <CatagoriesUl />
      <div className="px-10 mb-3">
        <h1 className="mb-7">Featured Products</h1>
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {data?.data.slice(0, 5).map((data: any, i: number) => (
              <div key={i} className="">
                <div className="border rounded w-[150px] p-2 bg-emerald-100 h-[200px]">
                  <img className="w-[79px]" src={data.image} alt="" />
                  <div className="">
                    <h1>Name:{data.name}</h1>
                    <h1>Price:{data.price}</h1>
                    <button
                      onClick={() => handelDetails(data._id)}
                      className="bg-gray-800 text-white p-1 rounded"
                    >
                      view the details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h1
            onClick={() => navigate("/products")}
            className="bg-blue-950 rounded text-center cursor-pointer w-fit mx-auto mt-3 mb-3 p-1 text-white"
          >
            Explore More
          </h1>
        </>
      </div>
      <Image />
    </div>
  );
};

export default Home;

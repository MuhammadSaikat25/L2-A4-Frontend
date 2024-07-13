import Banner from "../components/ui/Home/Banner";
import CatagoriesUl from "../components/ui/Home/CatagoriesUl";

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
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 ">
          {data?.data.slice(0, 5).map((data: any, i: number) => (
            <div key={i} className="">
              <div className="border rounded w-[150px] p-2">
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
      </div>
    </div>
  );
};

export default Home;

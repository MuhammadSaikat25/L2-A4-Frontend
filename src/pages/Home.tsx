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

      <div className="flex flex-col items-center justify-center gap-4 bg py-[170px] relative">
        <div className="bg-slate-700 flex flex-col gap-4 p-2 items-center justify-center bg-opacity-70 absolute h-full top-0 text-gray-100">
          <div className="lg:w-[40%] text-left">
            <h1 className=" font-semibold text-[16px]">
              1 Enhanced Performance
            </h1>
            <div className="">
              <div className="">
                <p>
                  {" "}
                  Our premium-quality fitness equipment is designed to optimize
                  your workout performance. Whether you’re lifting weights,
                  doing cardio, or practicing yoga, our products ensure better
                  form, endurance, and results.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-[40%] text-right">
            <p className="tw font-semibold text-[16px]">
              2 Durability & Long-lasting Quality
            </p>
            <div className="">
              nvest in fitness gear that stands the test of time. Built from
              high-quality materials, our equipment is designed to endure even
              the most intense training sessions, providing you with reliable
              support for years.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useGetCategoriesQuery } from "../../../redux/Feature/Categories/categoriesApi";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { useNavigate } from "react-router-dom";
const CatagoriesUl = () => {
  const navigate = useNavigate();
  const { data: categories } = useGetCategoriesQuery(undefined);
  interface TCategories {
    name: string;
    image: string;
    _id: string;
  }

  const handleCategoryClick = (id: string) => {
    navigate(`products/${id}`);
  };

  return (
    <div className=" lg:w-[1300px] mx-auto mb-10 p-2">
      <h1 className="text-gray-950 font-semibold mb-5">
        EQUIPMENT MADE FOR YOUR LIFESTYLE
      </h1>
      <Swiper watchSlidesProgress={true} slidesPerView={3} className="mySwiper">
        {categories?.data?.map((data: TCategories, i: number) => (
          <SwiperSlide key={i}>
            <div onClick={()=>handleCategoryClick(data.name)} className="mx-auto cursor-pointer flex flex-col gap-10 p-3 ">
              <img
                className="w-[350px] border-black border h-[200px] rounded-md object-cover"
                src={data.image}
                alt="image"
              />
              <h1 className="text-center font-semibold text-gray-950">
                {data.name}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CatagoriesUl;

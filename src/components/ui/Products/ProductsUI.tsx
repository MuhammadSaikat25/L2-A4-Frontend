import { useParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

import {
  useGetProductsBaseOnMultipleCategoriesMutation,
  useGetProductsBaseOnSingleCategoriesQuery,
  useGetProductsByNameMutation,
  useGetProductsQuery,
} from "../../../redux/Feature/products/productsApi";
import { TProducts } from "../../../@types/Products";
import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../../redux/Feature/Categories/categoriesApi";
import { TCategories } from "../../../@types/categories";

const ProductsUI = () => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: categories } = useGetCategoriesQuery(undefined);
  const singleCategoryQuery = id
    ? useGetProductsBaseOnSingleCategoriesQuery(id)
    : null;

  // ! check if id(categories) are available then products will fetch base on that id (categories), or if id(categories) not available then by default all products will fetch
  const productsQuery = !id ? useGetProductsQuery(undefined) : null;
  const data = id ? singleCategoryQuery?.data : productsQuery?.data;
  const [getProductsByName, { data: searchProduct }] =
    useGetProductsByNameMutation();
  
  const [getProductsBaseOnMultipleCategories, { data: FilterProducts }] =
    useGetProductsBaseOnMultipleCategoriesMutation();
  // ! set useEffect for get filter's products
  useEffect(() => {
    if (selectedCategories.length > 0) {
      getProductsBaseOnMultipleCategories(selectedCategories);
    }
    setProducts(FilterProducts?.data);
  }, [selectedCategories, getProductsBaseOnMultipleCategories]);
  // ! getting default all products or any selected categories's products
  useEffect(() => {
    setProducts(data?.data);
  }, [data, selectedCategories.length === 0]);

  // ! check selected categories
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedCategories((prevSelected) =>
      checked
        ? [...prevSelected, name]
        : prevSelected.filter((item) => item !== name)
    );
  };
  const handelSearch = async () => {
    getProductsByName(search);
    setProducts(searchProduct?.data);
  };
  

  return (
    <div className="relative mt-2">
      <div className="pl-2 flex justify-around items-center">
        <div className="flex items-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            type="text"
            className="border border-black rounded-2xl   px-2"
          />
          <IoMdSearch
            className="cursor-pointer"
            onClick={handelSearch}
            size={25}
          />
        </div>
        <div className="">
          <button
            onClick={() => setModal(!modal)}
            className="bg-blue-700 text-white px-3 rounded-xl"
          >
            Filter
          </button>
          {modal && (
            <div className="border rounded ml-2 p-1 text-white bg-zinc-700 absolute z-10">
              {categories?.data.map((data: TCategories, i: number) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    name={data.name}
                    id={data.name}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={data.name}>{data.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* --------------------------- image and details section ----------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-4 p-2 ">
        {product?.map((product: TProducts, i: number) => (
          <div key={i} className="border border-black p-2 rounded-lg">
            <img
              className="w-[150px] h-[150px] mx-auto"
              src={product.image}
              alt=""
            />
            <hr />
            <div className=" text-center">
              <h1>Name: {product.name}</h1>
              <h1 className="mt-1 mb-1">Price: ${product.price}</h1>
              <button className="bg-blue-500 p-1 text-white rounded-lg">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsUI;

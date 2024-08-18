import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

import {
  useGetProductsBaseOnMultipleCategoriesMutation,
  useGetProductsBaseOnSingleCategoriesQuery,
  useGetProductsByNameMutation,
  useGetProductsQuery,
} from "../../../redux/Feature/products/productsApi";
import { useGetCategoriesQuery } from "../../../redux/Feature/Categories/categoriesApi";
import { TProducts } from "../../../@types/Products";
import { TCategories } from "../../../@types/categories";

const ProductsUI = () => {
  const { id } = useParams();
  const [maxPrice, setMaxPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: categories } = useGetCategoriesQuery(undefined);
  const [sortByPrice, setSortByPrice] = useState("ascending");
  const { data: categoriesBaseProducts } =
    useGetProductsBaseOnSingleCategoriesQuery(
      { name: id!, sort: sortByPrice },
      { skip: !id }
    );

  const { data: product, refetch } = useGetProductsQuery(sortByPrice);
  const [getProductsByName, { data: searchProduct }] =
    useGetProductsByNameMutation();
  const [
    getProductsBaseOnMultipleCategories,
    { data: FilterProducts, isSuccess },
  ] = useGetProductsBaseOnMultipleCategoriesMutation();

  useEffect(() => {
    if (selectedCategories.length > 0) {
      getProductsBaseOnMultipleCategories(selectedCategories);
    }
    setProducts(FilterProducts?.data);
  }, [selectedCategories, getProductsBaseOnMultipleCategories]);

  useEffect(() => {
    id ? setProducts(categoriesBaseProducts?.data) : setProducts(product?.data);
  }, [product?.data, categoriesBaseProducts?.data]);

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

  useEffect(() => {
    if (searchProduct?.data) {
      setProducts(searchProduct?.data);
    }
  }, [searchProduct]);
  useEffect(() => {
    
    setProducts(FilterProducts?.data);
  }, [FilterProducts]);
  const handelClear = () => {
    setModal(false);
    refetch();
    setProducts(product?.data);
  };

  const handleSortByPriceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortByPrice(event.target.value);
    setModal(false);
  };

  // useEffect(() => {
  //   if(product){
  //     setMaxPrice(Math.max(...products?.map((product: any) => product?.price)));
  //   }
  // }, [products]);
    useEffect(()=>{
      setProducts(product?.data)
    },[product])
  return (
    <div className="relative mt-2">
      <div className="pl-2 flex justify-around items-center">
        <div className="flex items-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            type="text"
            className="border border-black rounded-2xl px-2"
          />
          <IoMdSearch
            className="cursor-pointer"
            onClick={() => handelSearch()}
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
                    defaultChecked={id === data.name}
                  />
                  <label htmlFor={data.name}>{data.name}</label>
                </div>
              ))}
              <button
                onClick={() => handelClear()}
                className="text-white bg-red-700 px-1 rounded"
              >
                Clear Filter
              </button>
              <div className="">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  className="slider"
                  data-index="0"
                />
              </div>
              <div className="bg-gray-600 mt-2 p-1 rounded">
                <label htmlFor="sort-price">Sort by Price: </label>
                <select
                  value={sortByPrice}
                  onChange={handleSortByPriceChange}
                  id="sort-price"
                  className="bg-gray-800 text-white px-1 rounded"
                >
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image and details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-4 p-2">
        {products?.map((product: TProducts, i: number) => (
          <div key={i} className="border border-black p-2 rounded-lg">
            <img
              className="w-[150px] h-[150px] mx-auto"
              src={product.image}
              alt=""
            />
            <hr />
            <div className="text-center">
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

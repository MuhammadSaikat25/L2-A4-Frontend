import { useParams } from "react-router-dom";
import {
  useGetProductsByIdQuery,
  useUpdateProductsMutation,
} from "../../../redux/Feature/products/productsApi";
import { useGetCategoriesQuery } from "../../../redux/Feature/Categories/categoriesApi";
import { TCategories } from "../../../@types/categories";
import { useEffect, useState } from "react";
import {ToastContainer,toast} from 'react-toastify'

const ProductEdit = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: product, isLoading: productLoading, refetch } = useGetProductsByIdQuery(
    id!
  );
  const [updateProducts] = useUpdateProductsMutation();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setName(product?.data?.name);
    setDescription(product?.data?.description);
    setImage(product?.data.image);
    setQuantity(product?.data.quantity);
    setPrice(product?.data.price);
    setSection(product?.data.section);

    if (!productLoading && !categoriesLoading && product && categories) {
      const productCategories = product.data.categories || [];
      setSelectedCategories(productCategories);
      setInitialized(true);
    }
  }, [productLoading, categoriesLoading, product, categories]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((item) => item !== value)
    );
  };
  const handelSubmit = async (e: any) => {
    e.preventDefault();
    const updateData = {
      name,
      price,
      image,
      quantity,
      section,
      description,
      categories:selectedCategories,
    };
    updateProducts({ id: id, updateData });
    refetch()
    toast("Product update successful")
  };
  return (
    <div>
        <ToastContainer/>
        
      <form className="flex flex-col gap-2 bg-red-300 w-[1000px] mx-auto p-4 mt-2 rounded-md">
        <input
          className="border p-1 rounded-md border-black"
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={product.data.name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-1 rounded-md border-black"
          type="text"
          name="image"
          placeholder="Image Url"
          defaultValue={product.data.image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className="border p-1 rounded-md border-black"
          type="number"
          name="quantity"
          placeholder="Quantity"
          defaultValue={product.data.quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          className="border p-1 rounded-md border-black"
          type="number"
          name="price"
          placeholder="Price"
          defaultValue={product.data.price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <div className="">
          <h1>Select categories</h1>
          {categories?.data?.map((data: TCategories, i: number) => (
            <div key={i} className="">
              <input
                type="checkbox"
                name="categories"
                value={data.name}
                defaultChecked={selectedCategories.includes(data.name)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={data.name}>{data.name}</label>
            </div>
          ))}
        </div>
        <input
          className="border p-1 rounded-md border-black"
          type="text"
          name="section"
          placeholder="Section"
          defaultValue={product.data.section}
          onChange={(e) => setSection(e.target.value)}
        />
        <input
          className="border p-1 rounded-md border-black"
          type="text"
          name="description"
          placeholder="Description"
          defaultValue={product.data.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handelSubmit}
          className="w-full bg-gray-700 rounded text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;

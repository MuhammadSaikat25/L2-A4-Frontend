import { useCarateProductMutation } from "../../../redux/Feature/products/productsApi";
import { useGetCategoriesQuery } from "../../../redux/Feature/Categories/categoriesApi";
import { TCategories } from "../../../@types/categories";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");
  const [carateProduct] = useCarateProductMutation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: categories } = useGetCategoriesQuery(undefined);

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
    const carateData = {
      name,
      price,
      image,
      quantity,
      section,
      description,
      categories: selectedCategories,
    };
    if (selectedCategories.length === 0) {
      return toast("please select a categories");
    }
    carateProduct(carateData);
    toast("Product create successful");
  };
  return (
    <div>
      <ToastContainer />
      <form className="flex flex-col gap-2 bg-red-300 w-[1000px] mx-auto p-4 mt-2 rounded-md">
        <input
          className="border p-1 rounded-md border-black"
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-1 rounded-md border-black"
          type="text"
          name="image"
          placeholder="Image Url"
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className="border p-1 rounded-md border-black"
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          className="border p-1 rounded-md border-black"
          type="number"
          name="price"
          placeholder="Price"
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
          onChange={(e) => setSection(e.target.value)}
        />
        <input
          className="border p-1 rounded-md border-black"
          type="text"
          name="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handelSubmit}
          className="w-full bg-gray-700 rounded text-white"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

import { useEffect } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../redux/Feature/products/productsApi";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const ProductsManagementUI = () => {
  const { data, refetch } = useGetProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [data?.data]);

  const updateData = (id: string) => {
    navigate(`/product/${id}`);
  };
  const handelDelete = (id: string) => {
    <ToastContainer />;
    deleteProduct(id);
    toast("Product delete successful");
    refetch();
  };
  return (
    <div className="">
      <ToastContainer />
      <div className="container mx-auto p-4 rounded-md">
        <div className="bg-red-500 w-fit mx-auto mb-3 text-white rounded-md p-1">
          <NavLink className={"text-center w-fit"} to={"/create-product"}>
            Create Product
          </NavLink>
        </div>
        <div>
          <table className="table-fixed lg:w--[40%] mx-auto bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 py-2">Product Name</th>
                <th className="w-1/4 py-2">Price</th>
                <th className="w-1/4 py-2">Category</th>
                <th className="w-1/4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((product: any, index: number) => (
                <tr
                  key={index}
                  className="bg-gray-100 border-b border-gray-200"
                >
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4">{product.categories}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => updateData(product._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handelDelete(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagementUI;

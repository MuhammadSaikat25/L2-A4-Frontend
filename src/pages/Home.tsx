import Banner from "../components/ui/Home/Banner";
import CatagoriesUl from "../components/ui/Home/CatagoriesUl";
import { useGetProductsQuery } from "../redux/Feature/products/productsApi";

const Home = () => {
  const { data: products } = useGetProductsQuery(undefined);

  return (
    <div>
      <Banner />
      <CatagoriesUl />
    </div>
  );
};

export default Home;

import Banner from "../components/ui/Home/Banner";
import { useGetProductsQuery } from "../redux/Feature/products/productsApi";

const Home = () => {
  const { data } = useGetProductsQuery(undefined);
  console.log(data?.data);
  return (
    <div>
      <Banner></Banner>
    </div>
  );
};

export default Home;

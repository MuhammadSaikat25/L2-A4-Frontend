import { useGetProductsQuery } from "../../../../redux/Feature/products/productsApi";
import  './image.css'
const MosaicView  = () => {
    const {data}=useGetProductsQuery(undefined)
  return (
    <div>
      <div className="mosaic-container">
        {data?.data.map((data:any, index:number) => (
          <img
            key={index}
            className="mosaic-image"
            src={data.image}
            alt={`mosaic-img-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MosaicView ;

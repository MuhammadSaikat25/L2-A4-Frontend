import img1 from "../../../../assets/images/img1.png";
import img2 from "../../../../assets/images/img1.webp";
import img3 from "../../../../assets/images/img3.png";
import img5 from "../../../../assets/images/img5.png";
import img6 from "../../../../assets/images/img6.webp";
import img7 from "../../../../assets/images/img7.png";
import img8 from "../../../../assets/images/img8.png";
import img9 from "../../../../assets/images/img9.jpeg";

const Image = () => {
  return (
    <div className="bg-gray-300">
      <div className=" p-10 mx-auto  lg:w-[900px]">
        <div className="columns-2 sm:columns-3 cursor-pointer lg:columns- xl:columns-4 [&>img:not(:first-child)]:mt-5 lg::[&>img:not(:first-child)]:mt-8">
          <img
            className="w-[200px] h-[200px] border bg-white rounded-sm border-gray-800"
            src={img1}
            alt=""
          />
          <img
            className="w-[200px] h-[200px] border bg-white rounded-sm border-gray-800"
            src={img3}
            alt=""
          />
          <img
            className="w-[200px] h-[300px] border bg-white rounded-sm border-gray-800"
            src={img2}
            alt=""
          />
          <img
            className="w-[200px] h-[230px] border bg-white rounded-sm border-gray-800"
            src={img5}
            alt=""
          />
          <img
            className="w-[200px] h-[250px] border bg-white rounded-sm border-gray-800"
            src={img8}
            alt=""
          />
          <img
            className="w-[200px] h-[200px] border bg-white rounded-sm border-gray-800"
            src={img7}
            alt=""
          />
          <img
            className="w-[200px] h-[200px] border bg-white rounded-sm border-gray-800"
            src={img6}
            alt=""
          />
          <img
            className="w-[200px] h-[200px] border bg-white rounded-sm border-gray-800"
            src={img9}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Image;

import CompanyOverview from "../components/ui/AboutUs/CompanyOverview";
import ContactInfo from "../components/ui/AboutUs/ContactInfo";
import CustomerTestimonials from "../components/ui/AboutUs/CustomerTestimonials";
import TeamIntroduction from "../components/ui/AboutUs/TeamIntroduction";
import TeamMembers from "../components/ui/AboutUs/teamMembers";

const AboutUs = () => {
  return (
    <div className="h-screen">
      <div className="h-[50%] bg-red-600"></div>

      <div className="absolute z-1  lg:top-[150px] lg:left-[220px] bg-gray-700 rounded-md text-white w-[70%] text-center">
        <h1>About Us</h1>
        <CompanyOverview />
        <hr />
        <TeamIntroduction />
        <hr />
        <ContactInfo />
        <hr />
        <TeamMembers />
        <hr />
        <CustomerTestimonials />
      </div>
      <div className="h-[50%] bg-blue-600"></div>
    </div>
  );
};

export default AboutUs;

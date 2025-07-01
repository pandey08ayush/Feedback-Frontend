import Banner from "../components/Banner";
import BestSeller from "../components/BestSeller";
import Category from "../components/Category";
import NewsLetter from "../components/NewsLetter";
import Testinomials from "../components/Testinomials";

const Home = () => {
  return (
    <div className="mt-10">
      <Banner />
      <Category />
      <BestSeller />
      <Testinomials />
      <NewsLetter />
    </div>
  );
};
export default Home;

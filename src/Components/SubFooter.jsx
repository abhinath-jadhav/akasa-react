import Container from "./Container";
import { Link } from "react-router-dom";

const SubFooter = ({ desc, button, to }) => {
  return (
    <div className="bg-primery h-28 flex items-center mt-6">
      <Container
        className={"gap-2 md:gap-10 flex-col md:flex-row items-center px-2"}
      >
        <h3 className="text-secondary text-center md:text-xl">{desc}</h3>
        <Link to={to}>
          <div
            className="bg-secondary md:text-3xl text-center font-semibold px-2 py-2 rounded-lg md:px-4  md:rounded-2xl text-slate-50 shadow 
              shadow-white hover:bg-slate-50 hover:text-secondary hover:shadow-secondary
            "
          >
            <p>{button}</p>
          </div>
        </Link>
      </Container>
    </div>
  );
};

export default SubFooter;

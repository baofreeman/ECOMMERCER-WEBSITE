import { useNavigate } from "react-router-dom";
import FullScreenScroll from "../shared/FullScreenScroll";
import { Button } from "../ui";
import { IMAGE_CATEGORIES, IMAGE_LIST } from "../../constants";
import { useCallback } from "react";

const PublicLayout = () => {
  const navigate = useNavigate();

  // Memoized navigation handler
  const handleLink = useCallback(
    (link) => {
      navigate(link);
    },
    [navigate]
  );

  return (
    <main className="w-full relative dark:bg-black h-full overflow-hidden">
      <section className="w-full h-full overflow-hidden">
        {/* Container for the scrollable slides */}
        <FullScreenScroll>
          {IMAGE_CATEGORIES.map((item) => (
            <article
              key={item.link} // Use link as unique key
              onClick={() => handleLink(item.link)} // Navigate on click
              className="h-full"
            >
              <img
                src={item.image}
                alt={item.category || "image categoies"} // Added alt for accessibility
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </article>
          ))}
        </FullScreenScroll>
      </section>

      {/* Bottom section for additional images, visible on small screens */}
      <section className="absolute bottom-0 w-full px-[40px] h-[200px] sm:hidden">
        <div className="w-full h-full relative flex gap-8 sm:gap-4 pb-[20px]">
          {IMAGE_LIST.map((item) => (
            <aside
              key={item.link} // Use link as unique key
              className="w-full full flex items-center justify-center relative"
            >
              <div
                className="rounded-lg h-[250px] w-[250px] md:h-[100px] md:w-[100px] absolute bottom-20 cursor-pointer gap-8 flex items-end justify-center transition-transform duration-300 transform hover:scale-105"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
                onClick={() => handleLink(item.link)} // Navigate on click
              >
                <div className="absolute bottom-10 px-[50%] text-lg">
                  <Button
                    size="s-link"
                    design="link-basic"
                    width="full"
                    to={item.link} // Navigate to link
                  >
                    {item.category}
                  </Button>
                </div>
              </div>
            </aside>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PublicLayout;

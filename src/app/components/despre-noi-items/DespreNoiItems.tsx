import { fetchCategory } from "../asyncOperations/fetch-by-id/fetchBYId";
import { fetchCategoryDescriptions } from "../asyncOperations/fetch/fetchAllFields";
import CustomizedAccordions from "../accordion/Accordion";
import ProdusCard from "../card-produse/ProdusCard";
import "./DespreNoiItems.css";


const DespreNoiItems = async ({ params }) => {
  const slug = params.categoryName;

  const category = slug
    .split("-")
    .join(" ")
    .toLowerCase();

  const [products, descriptionsData] = await Promise.all([
    fetchCategory(category),
    fetchCategoryDescriptions()
  ]);

  const matchedDescription = descriptionsData?.find(
    desc =>
      desc.attributes?.category?.toLowerCase() === category
  );

  const header =
    slug === "masca-de-calorifer"
      ? "Mască de calorifer MDF"
      : slug.replaceAll("-", " ");

  return (
    <div className="despre-noi-items-box">

      <div className="accordionplushd">

        <div className="accordion-container">
          <CustomizedAccordions />
        </div>

        <div className="headerplusdescription">

          <h1 className="header">
            {header}
          </h1>

          <div className="description-container">

            {matchedDescription?.attributes?.description && (
              <p className="description-text">
                {matchedDescription.attributes.description}
              </p>
            )}

          </div>

        </div>

      </div>

      <div className="cardList-container">

        {products?.map(e => (
          <ProdusCard
            key={e.id}
            id={e.id}
            title={e.attributes?.title || "Produs decorativ"}
            description={e.attributes?.description || ""}
            thumbnail={
              e.attributes?.image?.data?.[0]?.attributes?.url || ""
            }
            disponibil="Este disponibil"
            price={e.attributes?.price || "Preț indisponibil"}
          />
        ))}

      </div>

    </div>
  );
};

export default DespreNoiItems;
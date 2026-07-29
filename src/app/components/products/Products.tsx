
import "./Product.css";
import ProdusCard from '../card-produse/ProdusCard';
import { fetchPanouriData } from '../asyncOperations/fetch/fetchAllFields';
import { promotii } from '../asyncOperations/populate-db';

const Products = async () => {


  const cardList = await fetchPanouriData();
  const promotileMele = await promotii();
  const promotiilePagina=promotileMele?.data;



  return (
    <div className='normal-headers' suppressHydrationWarning>
      <div className='margin0Auto'>
        {cardList.length > 0 ? cardList.map((data,index) => (
          <ProdusCard
            key={data.id}
            image={data?.attributes?.image?.data?.[0]?.attributes?.url}
            title={data.attributes?.title}
            disponibil={"Produs Disponibil"}
            description={data.attributes?.description}
            price={data.attributes?.price}
            priority={index === 0}

            id={data.id}
          />
        )) : null}
      </div>
      <div className='products-container'>
              
      <p>Promotii  actuale</p>

        <hr className='black'></hr>
        <div className='margin0Auto'>

        {
        promotiilePagina?.length > 0
        ? promotiilePagina.map(e=>
        (  <ProdusCard
           key={e.id}
           image={e.attributes?.promotionImage?.data?.attributes?.url}
           title={e.attributes?.title}
           description={e.attributes?.description}
           price={e.attributes?.promotionPrice}
           disponibil='disponibil'
          id={e.id}          
         />)
          
        )
        :
        null
      }

        </div>

      </div>

 </div>
  );
};

export default Products;
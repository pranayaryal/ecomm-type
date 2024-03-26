import AccordionProvider from '@/context/AccordionProvider';
import AccordionItem from '@/components/AccordionItem'
import AccordionPanel from '@/components/AccordionPanel'

const ProductAccordion: React.FC = () => {
  return (
    <AccordionProvider>
      <AccordionItem toggle="panel-1" className='text-md mt-4 block'>
        Description & fit
      </AccordionItem>
      <AccordionPanel id="panel-1">
        <p className="mb-4">
          New Arrival
          Regular-fit polo shirt in soft, woven bouclé with a comfortable, classic silhouette. Collar, short button placket, short sleeves, and a straight-cut hem.
          Article number:1212590001
          Model size: The model is 187cm/6'2" and wears a size M
          Length: Regular length
          Sleeve Length: Short sleeve
          Fit: Regular fit
          Collar: Turn-down Collar
          Style: Polo shirt
          Description: White, Solid-color
          Imported: Yes
        </p>
        <p className='mb-4'>
        </p>

      </AccordionPanel>
      <AccordionItem toggle="panel-2">
        Materials
      </AccordionItem>
      <AccordionPanel id="panel-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className='mb-4'>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

      </AccordionPanel>
      <AccordionItem toggle="panel-3">
        Care guide

      </AccordionItem>
      <AccordionPanel id="panel-3" className='border-b-gray-300 border-b'>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

      </AccordionPanel>

    </AccordionProvider>
  )
};

export default ProductAccordion;
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
          <p className='text-xs'>New Arrival</p>
          <p>Regular-fit polo shirt in soft, woven bouclé with a comfortable, classic silhouette. Collar, short button placket, short sleeves, and a straight-cut hem.</p>
          <p className='text-xs'>Article number:1212590001</p>
          <div className='text-xs flex flex-col space-y-2 my-4'>
            <p><span className='font-bold'>Length:</span>Regular length</p>
            <p><span className='font-bold'>Sleeve Length:</span>Short sleeve</p>
            <p><span className='font-bold'>Fit:</span>Regular fit</p>
            <p><span className='font-bold'>Collar:</span>Turn-down Collar</p>
            <p><span className='font-bold'>Style:</span>Polo shirt</p>
            <p><span className='font-bold'>Description:</span>White, Solid-color</p>
            <p><span className='font-bold'>Imported:</span>Yes</p>
          </div>

      </AccordionPanel>
      <AccordionItem toggle="panel-2">
        Materials
      </AccordionItem>
      <AccordionPanel id="panel-2">
        <p className='text-xs mb-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className='mb-4 text-xs'>
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
        <p className="mb-4 text-xs">
          You too can help the environment and make fashion more sustainable. Bring unwanted clothes or home textiles to any H&M store and they will be reworn, reused or recycled.
        </p>
        <p>Care instructions</p>
        <ul className='text-xs space-y-1 list-disc px-3'>
          <li>Only non-chlorine bleach when needed</li>
          <li>No dry clean</li>
          <li>Machine wash cool</li>
          <li>Line dry</li>
          <li>Low iron</li>
        </ul>
      </AccordionPanel>

    </AccordionProvider>
  )
};

export default ProductAccordion;

import AccordionProvider from '@/context/AccordionProvider';
import AccordionItem from '@/components/AccordionItem'
import AccordionPanel from '@/components/AccordionPanel'

const Faq = () => {
  return (
    <AccordionProvider>
      <AccordionItem toggle="panel-1">
        Deflect security questionnaires

      </AccordionItem>
      <AccordionPanel id="panel-1">
        <p className="mb-4">
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
      <AccordionItem toggle="panel-2">
        Automation + human review

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
        Seamless sharing + security

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

export default Faq;
import { ModeToggle } from '@/components/mode-toggle.tsx';
import PrinterStateCard from '@/components/printer-state-card.tsx';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel.tsx';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

const board: string[][] = [
  ['Printer0', 'Printer1', 'Printer2', 'Printer3'],
  ['Printer4', 'Printer5', 'Printer6', 'Printer7'],
];

function Board({ printerNames }: { printerNames: string[] }) {
  return (
    <div className="mx-0 grid grid-cols-1 gap-4 lg:grid-cols-2">
      {printerNames.map((name) => (
        <PrinterStateCard printerName={name} key={name} />
      ))}
    </div>
  );
}

export default function PrinterDashboard() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      console.log('current');
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section aria-label="printer dashboard">
      <div className="mx-2 flex flex-row content-center items-center justify-between md:mx-4">
        <h2 className="py-4 text-3xl">Printer Dashboard</h2>
        <ModeToggle />
      </div>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 15000,
          }),
        ]}
        opts={{
          loop: true,
          duration: 50,
        }}
      >
        <CarouselContent>
          {board.map((names, i) => (
            <CarouselItem key={i}>
              <Board printerNames={names} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="text-md pt-3 text-center text-muted-foreground">
        {current} / {count}
      </div>
    </section>
  );
}

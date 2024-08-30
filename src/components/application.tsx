import { useEffect, useState } from 'react';
import Quotes from './quotes';
import InspirationalQuote from './quote';
import Loading from './loading';

export type Quote = {
  id: number;
  content: string;
  source?: string;
};

export const fetchRandomQuote = async () => {
  const response = await fetch(`/api/quotes/random`);
  return response.json();
};

export const fetchQuotes = async (count: number) => {
  const response = await fetch(`/api/quotes?limit=${count}`);
  return response.json();
};

const Application = () => {
  const [quote, setQuote] = useState<Quote | undefined>();
  const [quoteNumber, setQuoteNumber] = useState<Number | undefined>();
  const [quoteList, setQuoteList] = useState<Array<Quote> | undefined>([])

  const loadQuotes = (count: number) => {
    fetchQuotes(count).then(setQuoteList)
  }

  useEffect(() => {
    fetchRandomQuote().then(setQuote);
  }, []);

  if (!quote) return <Loading />;
  return (
    <main className="w-full max-w-2xl py-16 mx-auto">
      <InspirationalQuote content={quote.content} source={quote.source} />
      <Quotes count={quoteNumber} onChange={setQuoteNumber} onSubmit={loadQuotes}>
        <div className="grid grid-cols-2 gap-4">
          {quoteList?.map((quote) => 
            <InspirationalQuote content={quote.content} source={quote.source} key={quote.id} />
          )}
        </div>
      </Quotes>
    </main>
  );
};

export default Application;

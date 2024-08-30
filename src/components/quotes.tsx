import { useState } from 'react';
import { PropsWithChildren } from 'react';

type QuotesProps = {
  count: Number | undefined,
  onSubmit: any
  onChange: React.Dispatch<React.SetStateAction<Number | undefined>>
}

const Quotes = ({ children, count, onSubmit, onChange }: PropsWithChildren<QuotesProps>) => {
  return (
    <section className="flex flex-col gap-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange(0);
          onSubmit(count);
        }}
      >
        <label htmlFor="number-of-quotes-to-load" className="block">
          Number of Quotes to Load
        </label>
        <div className="flex">
          <input
            id="number-of-quotes-to-load"
            className="w-full"
            type="number"
            min="0"
            max="25"
            value={Number(count)}
            onChange={(e) => onChange(e.target.valueAsNumber)}
          />
          <button type="submit">Load Quotes</button>
        </div>
      </form>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </section>
  );
};

export default Quotes;

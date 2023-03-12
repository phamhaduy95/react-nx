import React, { useEffect, useRef } from 'react';
import './LoadingScreen.scss';

export function LoadingScreen() {
  const loadingText = 'LOADING...';

  return (
    <div className="LoadingScreen">
      <div className="LoadingText">{renderLettersFromText(loadingText)}</div>
    </div>
  );
}

function renderLettersFromText(character: string) {
  const letters = getLettersFromString(character);

  return [...letters].map((e, i) => (
    <LoadingLetter key={i} index={i} letter={e} />
  ));
}

type LoadingLetterProps = {
  index: number;
  letter: string;
};

function LoadingLetter(props: LoadingLetterProps) {
  const { index, letter } = props;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el == null) return;
    el.style.setProperty("--letter-order",`${index}`);
  }, [index]);
  return (
    <div ref={ref} className="LoadingLetter">
      {letter}
    </div>
  );
}

function* getLettersFromString(character: string): IterableIterator<string> {
  let i = 0;
  while (i <= character.length) {
    yield character[i];
    i++;
  }
}

export interface Letter {
  content: string;
  country: 'pl' | 'de' | 'us';
  priority: 'high' | 'medium' | 'low';
}

interface SortingStrategy {
  compare(a: Letter, b: Letter): number;
}

export class PriorityStrategy implements SortingStrategy {
  compare(a: Letter, b: Letter): number {
    const priorityOrder = ['high', 'medium', 'low'];
    return (
      priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
    );
  }
}

export class CountryStrategy implements SortingStrategy {
  compare(a: Letter, b: Letter): number {
    const countryOrder = ['pl', 'de', 'us'];
    return countryOrder.indexOf(a.country) - countryOrder.indexOf(b.country);
  }
}

export class LengthStrategy implements SortingStrategy {
  compare(a: Letter, b: Letter): number {
    return a.content.length - b.content.length;
  }
}

export class LetterSorter {
  constructor(private strategy: SortingStrategy) {}
  sortLetters(letters: Letter[]): Letter[] {
    const soretedLetters = letters.slice().sort(this.strategy.compare);
    console.log(soretedLetters);

    return soretedLetters;
  }
}

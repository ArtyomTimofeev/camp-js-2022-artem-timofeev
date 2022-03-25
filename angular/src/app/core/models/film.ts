/** Film model. */
export interface Film {

  /** Film id. */
  readonly id: string;

  /** Character ids. */
  readonly charactersIds: readonly number[];

  /** Planets ids. */
  readonly planetsIds: readonly number[];

  /** Director name. */
  readonly director: string;

  /** Episode id. */
  readonly episodeId: number;

  /** Opening crawl. */
  readonly openingCrawl: string;

  /** Producer name. */
  readonly producer: string;

  /** Release date. */
  readonly releaseDate: Date;

  /** Title. */
  readonly title: string;
}

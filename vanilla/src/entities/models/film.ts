/** Film model. */
export interface Film {

  /** Film id. */
  readonly id: number;

  /** Character ids. */
  readonly characterIds: readonly number[];

  /** Specie ids. */
  readonly specieIds: readonly number[];

  /** Starship ids. */
  readonly starshipIds: readonly number[];

  /** Vehicle ids. */
  readonly vehicleIds: readonly number[];

  /** Planets ids. */
  readonly planetsIds: readonly number[];

  /** Create time. */
  readonly created: Date;

  /** Director name. */
  readonly director: string;

  /** Edit time. */
  readonly edited: Date;

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

  /** Model. */
  readonly model: string;

  /** Firebase id. */
  readonly firebaseId: string;
}

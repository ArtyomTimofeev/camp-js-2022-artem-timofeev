/* eslint-disable @typescript-eslint/naming-convention */

/** Film data that stored in firestore. */
export interface FilmDocument {

  /** Film fields. */
  readonly fields: {

    /** Character ids. */
    readonly characters: readonly number[];

    /** Specie ids. */
    readonly species: readonly number[];

    /** Starship ids. */
    readonly starships: readonly number[];

    /** Vehicle ids. */
    readonly vehicles: readonly number[];

    /** Create time (ISO format). */
    readonly created: string;

    /** Director name. */
    readonly director: string;

    /** Edit time (ISO format). */
    readonly edited: string;

    /** Episode id. */
    readonly episode_id: number;

    /** Opening crawl. */
    readonly opening_crawl: string;

    /** Producer name. */
    readonly producer: string;

    /** Release date (zzzz-yy-xx). */
    readonly release_date: string;

    /** Title. */
    readonly title: string;
  };

  /** Model. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

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
}

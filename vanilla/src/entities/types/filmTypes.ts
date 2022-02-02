/* eslint-disable @typescript-eslint/naming-convention */

/** Film data that stored in firestore. */
export interface FilmDocument {

  /** Film fields. */
  readonly fields: {

    /** Character ids. */
    readonly characters: number[];

    /** Specie ids. */
    readonly species: number[];

    /** Starship ids. */
    readonly starships: number[];

    /** Vehicle ids. */
    readonly vehicles: number[];

    /** Create time (ISO format). */
    readonly created: string;

    /** Director name. */
    readonly director: string;

    /** Edit time. */
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
  readonly characterIds: number[];

  /** Specie ids. */
  readonly specieIds: number[];

  /** Starship ids. */
  readonly starshipIds: number[];

  /** Vehicle ids. */
  readonly vehicleIds: number[];

  /** Create time (xx.yy.zzzz). */
  readonly created: string;

  /** Director name. */
  readonly director: string;

  /** Edit time (xx.yy.zzzz). */
  readonly edited: string;

  /** Episode id. */
  readonly episodeId: number;

  /** Opening crawl. */
  readonly openingCrawl: string;

  /** Producer name. */
  readonly producer: string;

  /** Release date (xx.yy.zzzz). */
  readonly releaseDate: string;

  /** Title. */
  readonly title: string;

  /** Model. */
  readonly model: string;
}

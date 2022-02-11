/** Film data that stored in firestore. */
export interface FilmDocumentDTO {

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

    /** Planets ids. */
    readonly planets: readonly number[];

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

  /** Uniqгу hash id. */
  readonly id: string;
}

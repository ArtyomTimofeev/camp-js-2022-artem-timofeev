/** Film data that stored in firestore. */
export interface FilmDto {

  /** Film fields. */
  readonly fields: {

    /** Character ids. */
    readonly characters: readonly number[];

    /** Planets ids. */
    readonly planets: readonly number[];

    /** Director name. */
    readonly director: string;

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

  /** Id. */
  readonly id: string ;
}

export type FilmCreateDto = Pick<FilmDto, 'fields'>;

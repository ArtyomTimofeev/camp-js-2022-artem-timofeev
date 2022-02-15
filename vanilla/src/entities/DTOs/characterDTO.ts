/** Character DTO. */
export interface CharacterDTO {

  /** Character fields. */
  readonly fields: {

    /** Birth year. */
    readonly birth_year: string;

    /** Creation date "2014-12-20T17:30:50.416Z". */
    readonly created: string;

    /** Edit date "2014-12-20T17:30:50.416Z". */
    readonly edited: string;

    /** Eye color, can be array divided by ",". */
    readonly eye_color: string;

    /** Gender. */
    readonly gender: string;

    /** Hair color, can be array. */
    readonly hair_color: string;

    /** Height in cm. */
    readonly height: string;

    /** Home world. */
    readonly homeworld: number;

    /** Mass in kg. */
    readonly mass: string;

    /** Name. */
    readonly name: string;

    /** Skin color, can be array. */
    readonly skin_color: string;
  };

  /** Model, collection name. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

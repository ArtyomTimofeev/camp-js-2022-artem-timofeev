/** Character model. */
export interface Character {

  /** Character id. */
  readonly id: number;

  /** Birth year (102BBY). */
  readonly birthYear: string;

  /** Eye color. */
  readonly eyeColor: readonly string[];

  /** Gender. */
  readonly gender: string;

  /** Hair color. */
  readonly hairColor: readonly string[];

  /** Height in cm. */
  readonly height: number;

  /** Mass in kg. */
  readonly mass: number;

  /** Name. */
  readonly name: string;

  /** Home world. */
  readonly homeworld: number;

  /** Skin color, can be array. */
  readonly skinColor: readonly string[];

  /** Creation date "2014-12-20T17:30:50.416Z". */
  readonly created: Date;

  /** Edit date "2014-12-20T17:30:50.416Z". */
  readonly edited: Date;

  /** Model, collection name. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

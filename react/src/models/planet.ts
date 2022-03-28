/** Planet model. */
export interface Planet {

  /** Film id. */
  readonly id: number;

  /** Climate descriptive word. */
  readonly climate: string;

  /** Diameter in units. */
  readonly diameter: string;

  /** Gravity in string format. */
  readonly gravity: string;

  /** Name. */
  readonly name: string;

  /** Time a astronomical object takes to complete one orbit around another object. */
  readonly orbitalPeriod: number;

  /** Population. */
  readonly population: number;

  /** Time a object takes to complete a single revolution around its axis of rotation. */
  readonly rotationPeriod: number;

  /** Percent of surface covered by water. */
  readonly surfaceWater: number;

  /** Terrain type. */
  readonly terrain: string;

  /** Creation date "2014-12-20T17:30:50.416Z". */
  readonly created: Date;

  /** Edit date "2014-12-20T17:30:50.416Z". */
  readonly edited: Date;

  /** Model, collection name. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

/** Planet DTO. */
export interface PlanetDto {

  /** Planet fields. */
  readonly fields: {

    /** Climate descriptive word. */
    readonly climate: string;

    /** Diameter in units. */
    readonly diameter: string;

    /** Gravity in string format. */
    readonly gravity: string;

    /** Name. */
    readonly name: string;

    /** Time a astronomical object takes to complete one orbit around another object. */
    readonly orbital_period: string;

    /** Population. */
    readonly population: string;

    /** Time a object takes to complete a single revolution around its axis of rotation. */
    readonly rotation_period: string;

    /** Percent of surface covered by water. */
    readonly surface_water: string;

    /** Terrain type. */
    readonly terrain: string;

    /** Creation date "2014-12-20T17:30:50.416Z". */
    readonly created: string;

    /** Edit date "2014-12-20T17:30:50.416Z". */
    readonly edited: string;
  };

  /** Model, collection name. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}

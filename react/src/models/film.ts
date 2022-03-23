import { Immerable, OmitImmerable } from './immerable';

/**
 * Film.
 */
export class Film extends Immerable {
  /** Film id. */
  public readonly id: string;

  /** Character ids. */
  public readonly charactersIds: number[];

  /** Planets ids. */
  public readonly planetsIds: number[];

  /** Director name. */
  public readonly director: string;

  /** Episode id. */
  public readonly episodeId: number;

  /** Opening crawl. */
  public readonly openingCrawl: string;

  /** Producer name. */
  public readonly producer: string;

  /** Release date. */
  public readonly releaseDate: Date;

  /** Title. */
  public readonly title: string;

  public constructor(data: FilmInitArgs) {
    super();
    this.id = data.id;
    this.charactersIds = data.charactersIds;
    this.planetsIds = data.planetsIds;
    this.director = data.director;
    this.episodeId = data.episodeId;
    this.openingCrawl = data.openingCrawl;
    this.producer = data.producer;
    this.releaseDate = data.releaseDate;
    this.title = data.title;
  }
}

type FilmInitArgs = OmitImmerable<Film>;

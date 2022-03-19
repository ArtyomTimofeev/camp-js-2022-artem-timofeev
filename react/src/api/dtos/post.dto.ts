/**
 * Post DTO.
 */
export interface PostDto {

  /** Post id. */
  readonly id: number;

  /** User id. */
  readonly userId: number;

  /** Title. */
  readonly title: string;

  /** Body. */
  readonly body: string;
}

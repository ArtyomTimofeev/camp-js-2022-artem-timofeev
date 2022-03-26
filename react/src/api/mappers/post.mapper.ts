import { Post } from 'src/models/post';
import { PostDto } from '../dtos/post.dto';

export namespace PostMapper {
  /**
   * Maps dto to model.
   * @param dto Post dto.
   * @returns
   */
  export function fromDto(dto: PostDto): Post {
    return new Post({
      id: dto.id,
      userId: dto.userId,
      title: dto.title,
      body: dto.body,
    });
  }
}

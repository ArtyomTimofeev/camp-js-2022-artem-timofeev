import { Post } from 'src/models/post';
import { PostDto } from '../dtos/post.dto';
import { PostMapper } from '../mappers/post.mapper';

export namespace PostService {
  /** Fetches posts. */
  export async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json() as PostDto[];
    return data.map(dto => PostMapper.fromDto(dto));
  }
}

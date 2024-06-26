import { Comment } from './comment';

export class Dish {
  id: string ;
  name: string | undefined;
  image: string | undefined;
  category: string | undefined;
  featured: boolean | undefined;
  label: string | undefined;
  price: string | undefined;
  description: string | undefined;
  comments: Comment[] | undefined;
}
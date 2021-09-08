import { User } from "./user.interface";
import { Comment } from "./comment.interface";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    user?: User;
    comments?: Comment[];
}

import { Comment } from "./models/comment.interface";
import { Post } from "./models/post.interface";
import { User } from "./models/user.interface";

export const comments: Comment[] = [
    {
        postId: 1,
        id: 1,
        name: 'id labore ex et quam laborum #1',
        email: 'Eliseo@gardner.biz #1',
        body: 'laudantium enim quasi est #1'
    },
    {
        postId: 1,
        id: 2,
        name: 'id labore ex et quam laborum #2',
        email: 'Eliseo@gardner.biz #2',
        body: 'laudantium enim quasi est #2'
    },
    {
        postId: 2,
        id: 3,
        name: 'id labore ex et quam laborum #3',
        email: 'Eliseo@gardner.biz #3',
        body: 'laudantium enim quasi est #3'
    }
];

export const posts: Post[] = [
    {
        userId: 1,
        id: 1,
        title: 'Post title #1',
        body: 'Post body #1'
    },
    {
        userId: 1,
        id: 2,
        title: 'Post title #2',
        body: 'Post body #2'
    },
    {
        userId: 2,
        id: 3,
        title: 'Post title #3',
        body: 'Post body #3'
    },
];


export const users: User[] = [
    {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
    },
    {
        id: 2,
        name: 'Ervin Howell',
        email: 'Shanna@melissa.tv',
    }
];

export const highlightedFirstPost = {
        userId: 1,
        id: 1,
        title: 'Post title <b class="highlighted">#1</b>',
        body: 'Post body <b class="highlighted">#1</b>',
        comments: [
            comments[0],
            comments[1]
        ],
        user: users[0]
    }

export const postsWithCommentsAndUsers: Post[] = [
    {
        userId: 1,
        id: 1,
        title: 'Post title #1',
        body: 'Post body #1',
        comments: [
            comments[0],
            comments[1]
        ],
        user: users[0]
    },
    {
        userId: 1,
        id: 2,
        title: 'Post title #2',
        body: 'Post body #2',
        comments: [
            comments[2]
        ],
        user: users[0]
    },
    {
        userId: 2,
        id: 3,
        title: 'Post title #3',
        body: 'Post body #3',
        comments: [

        ],
        user: users[1]
    },
];


export interface IHash {
    [url: string] : any;
}
export const mockApi: IHash = {
    'https://jsonplaceholder.typicode.com/posts': posts,
    'https://jsonplaceholder.typicode.com/users': users,
    'https://jsonplaceholder.typicode.com/comments': comments,
}

/*
 * モックを利用したBFFの単体テスト
 * バックエンドのAPIを呼び出すIntegrationテストではない
 */

import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { of } from 'rxjs';

describe('PostsController', () => {
  let postsController: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            findAll: jest.fn().mockReturnValue(
              of([
                { id: 1, title: '投稿1', content: 'これはサンプル投稿1です' },
                { id: 2, title: '投稿2', content: 'これはサンプル投稿2です' },
              ]),
            ),
            findOne: jest.fn().mockReturnValue(
              of({
                id: 1,
                title: '投稿1',
                content: 'これはサンプル投稿1です',
              }),
            ),
            create: jest.fn().mockReturnValue(
              of({
                id: 1,
                title: '新投稿1',
                content: 'これは新しいサンプル投稿1です',
              }),
            ),
            delete: jest.fn().mockReturnValue(of({ message: 'Post deleted' })),
            update: jest.fn().mockReturnValue(
              of({
                id: 1,
                title: '更新された投稿1',
                content: 'これは更新されたサンプル投稿1です',
              }),
            ),
          },
        },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(postsController).toBeDefined();
  });

  it('should return an array of posts', (done) => {
    postsController.findAll(1, 10).subscribe((result) => {
      expect(result).toEqual([
        { id: 1, title: '投稿1', content: 'これはサンプル投稿1です' },
        { id: 2, title: '投稿2', content: 'これはサンプル投稿2です' },
      ]);
      done();
    });
  });

  it('should return a single post', (done) => {
    postsController.findOne(1).subscribe((result) => {
      expect(result).toEqual({
        id: 1,
        title: '投稿1',
        content: 'これはサンプル投稿1です',
      });
      done();
    });
  });

  it('should create a new post', (done) => {
    postsController
      .create({ title: 'New Post', content: 'New Content' })
      .subscribe((result) => {
        expect(result).toEqual({
          id: 1,
          title: '新投稿1',
          content: 'これは新しいサンプル投稿1です',
        });
        done();
      });
  });

  it('should delete a post', (done) => {
    postsController.delete(1).subscribe((result) => {
      expect(result).toEqual({ message: 'Post deleted' });
      done();
    });
  });

  it('should update a post', (done) => {
    postsController
      .update(1, { title: 'Updated Post', content: 'Updated Content' })
      .subscribe((result) => {
        expect(result).toEqual({
          id: 1,
          title: '更新された投稿1',
          content: 'これは更新されたサンプル投稿1です',
        });
        done();
      });
  });
});

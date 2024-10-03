/*
 * コントローラー層
 * ルーティングの処理を記述
 * サービス層からのレスポンスをクライアントに返す
 */

import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 投稿一覧取得
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
  ): Observable<AxiosResponse<any>> {
    return this.postsService.findAll(page, perPage);
  }

  // 投稿の詳細取得
  @Get(':id')
  findOne(@Param('id') id: number): Observable<AxiosResponse<any>> {
    return this.postsService.findOne(id);
  }

  // 投稿の作成
  @Post()
  create(
    @Body() body: { title: string; content: string },
  ): Observable<AxiosResponse<any>> {
    return this.postsService.create(body);
  }

  // 投稿の削除
  @Delete(':id')
  delete(@Param('id') id: number): Observable<AxiosResponse<any>> {
    return this.postsService.delete(id);
  }

  // 投稿の更新
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ): Observable<AxiosResponse<any>> {
    return this.postsService.update(id, body);
  }
}

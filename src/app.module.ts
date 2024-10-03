/*
 * ルートモジュール
 * 他のモジュールをインポートして、アプリケーション全体を構築する
 */

import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [PostsModule],
})
export class AppModule {}

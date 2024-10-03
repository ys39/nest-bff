/*
 * サービス層
 * コントローラー層からリクエストを受け取り、バックエンドのAPIを呼び出す
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PostsService {
  private readonly baseUrl = 'http://localhost:8080/v1/api';

  constructor(private readonly httpService: HttpService) {}

  // 投稿一覧取得API
  findAll(page: number, perPage: number): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/list?page=${page}&per_page=${perPage}`;
    return this.httpService.get(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  // 投稿の詳細取得API
  findOne(id: number): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/detail/${id}`;
    return this.httpService.get(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  // 投稿の作成API
  create(post: {
    title: string;
    content: string;
  }): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/create`;
    return this.httpService.post(url, post).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  // 投稿の削除API
  delete(id: number): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.httpService.delete(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  // 投稿の更新API
  update(
    id: number,
    post: { title: string; content: string },
  ): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.httpService.put(url, post).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}

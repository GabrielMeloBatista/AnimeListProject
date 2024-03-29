/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PersonalListListaDto } from '../models/personal-list-lista-dto';

@Injectable({
  providedIn: 'root',
})
export class PersonalListControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation obterPorId2
   */
  static readonly ObterPorId2Path = '/api/v1/PersonalList/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorId2()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId2$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, PersonalListControllerService.ObterPorId2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPorId2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId2(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.obterPorId2$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation alterar2
   */
  static readonly Alterar2Path = '/api/v1/PersonalList/{id}';

  /**
   * Método utilizado para alterar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterar2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar2$Response(params: {
    id: number;
    body: PersonalListListaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, PersonalListControllerService.Alterar2Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para alterar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alterar2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar2(params: {
    id: number;
    body: PersonalListListaDto
  },
  context?: HttpContext

): Observable<any> {

    return this.alterar2$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation remover2
   */
  static readonly Remover2Path = '/api/v1/PersonalList/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remover2()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover2$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, PersonalListControllerService.Remover2Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remover2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover2(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.remover2$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation listAll2
   */
  static readonly ListAll2Path = '/api/v1/PersonalList';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll2$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, PersonalListControllerService.ListAll2Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll2(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.listAll2$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation incluir2
   */
  static readonly Incluir2Path = '/api/v1/PersonalList';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluir2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir2$Response(params: {
    body: PersonalListListaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, PersonalListControllerService.Incluir2Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `incluir2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir2(params: {
    body: PersonalListListaDto
  },
  context?: HttpContext

): Observable<any> {

    return this.incluir2$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getDados2
   */
  static readonly GetDados2Path = '/api/v1/PersonalList/data';

  /**
   * lazy loading
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDados2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDados2$Response(params: {
    offset: number;
    limit: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, PersonalListControllerService.GetDados2Path, 'get');
    if (params) {
      rb.query('offset', params.offset, {});
      rb.query('limit', params.limit, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * lazy loading
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDados2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDados2(params: {
    offset: number;
    limit: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.getDados2$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}

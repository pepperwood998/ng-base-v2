import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppHttpService {
  baseUrl = environment.apiBaseUrl;

  constructor(protected httpClient: HttpClient) {}

  post<T>(uri: string, options?: HttpOptions) {
    return this.request<T>(HttpMethod.POST, uri, options);
  }

  get<T>(uri: string, options?: HttpOptions) {
    return this.request<T>(HttpMethod.GET, uri, options);
  }

  put<T>(uri: string, options?: HttpOptions) {
    return this.request<T>(HttpMethod.PUT, uri, options);
  }

  delete<T>(uri: string, options?: HttpOptions) {
    return this.request<T>(HttpMethod.DELETE, uri, options);
  }

  request<T>(
    method: HttpMethod,
    uri: string,
    options?: HttpOptions,
  ): Observable<T> {
    const url = this.resolveUrl(uri);
    return this.httpClient.request<T>(method.toString(), url, options);
  }

  private resolveUrl(uri: string): string {
    let fullUrl = "";
    if (/^(https|http):\/\/.*$/.test(uri)) {
      fullUrl = uri;
    } else {
      fullUrl = `${this.baseUrl}${uri}`;
    }
    return fullUrl;
  }
}

interface HttpOptions {
  body?: any;
  headers?: HttpHeaders;
  params?: { [param: string]: string };
}

enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

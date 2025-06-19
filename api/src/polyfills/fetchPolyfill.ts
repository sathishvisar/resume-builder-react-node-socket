/** Polyfill Fetch globals for Node < 18, or if something wiped them. */
import { fetch as undiciFetch, Headers, Request, Response } from "undici";

if (typeof globalThis.fetch === "undefined") {
  globalThis.fetch    = undiciFetch as any;
  globalThis.Headers  = Headers       as any;
  globalThis.Request  = Request       as any;
  globalThis.Response = Response      as any;
}

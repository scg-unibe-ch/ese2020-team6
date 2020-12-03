import { ActivatedRouteSnapshot, UrlSegment } from '@angular/router';

export function getResolvedURL(route: ActivatedRouteSnapshot): string {
  return route.pathFromRoot.map((rootSegement: ActivatedRouteSnapshot) => {
    return rootSegement.url.map((segment: UrlSegment) => {
      return segment.path;
    }).join('/');
  }).join('/');
}

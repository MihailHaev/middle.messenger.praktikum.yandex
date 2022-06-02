import { ROUTES, ROUTES_TEMPLATE } from "./consts";

export const getTemplateFromRoute = (path) => (ROUTES_TEMPLATE[path] || ROUTES_TEMPLATE[ROUTES.notFound]);

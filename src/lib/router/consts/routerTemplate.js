import { main, auth, register, chats, settings, notFound, serverError } from '../../../pages'; 
import { ROUTES } from './routes';

export const ROUTES_TEMPLATE = {
    [ROUTES.main]: main(),
    [ROUTES.auth]: auth(),
    [ROUTES.register]: register(),
    [ROUTES.chats]: chats(),
    [ROUTES.settings]: settings(),
    [ROUTES.notFound]: notFound(),
    [ROUTES.serverError]: serverError(),
};

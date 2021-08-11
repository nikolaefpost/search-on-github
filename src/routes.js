import RepositoryPage from "./page/RepositoryPage";
import SearchPage from "./page/SearchPage";
import {REPOS_ROUTE, SEARCH_ROUTE} from "./utils/consts";

export  const routes = [
    {
        path: SEARCH_ROUTE,
        Component: SearchPage
    },
    {
        path: REPOS_ROUTE + '/:id',
        Component: RepositoryPage
    }

]
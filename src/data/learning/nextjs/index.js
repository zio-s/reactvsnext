import basics from './basics';
import rendering from './rendering';
import routing from './routing';
import apiRoutes from './api-routes';
import deployment from './deployment';
import dataFetching from './data-fetching';
import optimization from './optimization';
import middleware from './middleware';
import serverActions from './server-actions';

// Next.js 학습 데이터
const nextjsData = {
  basics,
  rendering,
  routing,
  api_routes: apiRoutes,
  deployment,
  data_fetching: dataFetching,
  optimization,
  middleware,
  server_actions: serverActions,
};

export default nextjsData;

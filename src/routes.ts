
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './screens/login';
import Main from './screens/main';

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Login,
      Main
    },
    {
      defaultNavigationOptions: navigation => ({
        header: null,
      })
    }
  )
);

export default Routes;
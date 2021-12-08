
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Test from './screens/Test';
import Main from './screens/Main';

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Test,
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
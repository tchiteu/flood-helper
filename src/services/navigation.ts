import { NavigationActions } from 'react-navigation';

let navigator: any;

export const setNavigator = (ref: any) => {
  navigator = ref;
}

export const navigate = (routeName: string, params?: any) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

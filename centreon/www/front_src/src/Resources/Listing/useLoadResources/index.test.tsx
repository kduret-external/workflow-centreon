import * as React from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { render, act, waitFor, RenderResult } from '@testing-library/react';
import { Provider } from 'jotai';

import { refreshIntervalAtom, userAtom } from '@centreon/ui-context';

import useFilter from '../../testUtils/useFilter';
import useListing from '../useListing';
import Context, { ResourceContext } from '../../testUtils/Context';
import useLoadDetails from '../../testUtils/useLoadDetails';

import useLoadResources from '.';

jest.mock('@centreon/ui-context', () =>
  jest.requireActual('centreon-frontend/packages/ui-context'),
);

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as jest.Mocked<unknown>),
  useSelector: jest.fn(),
}));

const mockUser = {
  locale: 'en',
  timezone: 'Europe/Paris',
};
const mockRefreshInterval = 60;

let context: ResourceContext;

const LoadResourcesComponent = (): JSX.Element => {
  useLoadResources();

  return <div />;
};

const TestComponent = (): JSX.Element => {
  const filterState = useFilter();
  const listingState = useListing();
  const detailsState = useLoadDetails();

  context = {
    ...filterState,
    ...listingState,
    ...detailsState,
  } as ResourceContext;

  return (
    <Context.Provider value={context}>
      <LoadResourcesComponent />
    </Context.Provider>
  );
};

const TestComponentWithJotai = (): JSX.Element => (
  <Provider
    initialValues={[
      [userAtom, mockUser],
      [refreshIntervalAtom, mockRefreshInterval],
    ]}
  >
    <TestComponent />
  </Provider>
);

const renderLoadResources = (): RenderResult =>
  render(<TestComponentWithJotai />);

const appState = {
  intervals: {
    AjaxTimeReloadMonitoring: 60,
  },
};

const mockedSelector = useSelector as jest.Mock;

describe(useLoadResources, () => {
  beforeEach(() => {
    mockedSelector.mockImplementation((callback) => {
      return callback(appState);
    });

    mockedAxios.get.mockResolvedValue({
      data: {
        meta: {
          limit: 30,
          page: 1,
          total: 0,
        },
        result: [],
      },
    });
  });

  afterEach(() => {
    mockedAxios.get.mockReset();
  });

  const testCases = [
    [
      'sort',
      (): void => context.setCriteria?.({ name: 'sort', value: ['a', 'asc'] }),
    ],
    ['limit', (): void => context.setLimit?.(20), '20'],
    [
      'search',
      (): void => context.setCriteria?.({ name: 'search', value: 'toto' }),
    ],
    [
      'states',
      (): void =>
        context.setCriteria?.({
          name: 'states',
          value: [{ id: 'unhandled', name: 'Unhandled problems' }],
        }),
    ],
    [
      'statuses',
      (): void =>
        context.setCriteria?.({
          name: 'statuses',
          value: [{ id: 'OK', name: 'Ok' }],
        }),
    ],
    [
      'resourceTypes',
      (): void =>
        context.setCriteria?.({
          name: 'resource_types',
          value: [{ id: 'host', name: 'Host' }],
        }),
    ],
    [
      'hostGroups',
      (): void =>
        context.setCriteria?.({
          name: 'host_groups',
          value: [{ id: 0, name: 'Linux-servers' }],
        }),
    ],
    [
      'serviceGroups',
      (): void =>
        context.setCriteria?.({
          name: 'service_groups',
          value: [{ id: 1, name: 'Web-services' }],
        }),
    ],
  ];

  it.each(testCases)(
    'resets the page to 1 when %p is changed and current filter is applied',
    async (_, setter) => {
      renderLoadResources();

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      });

      act(() => {
        context.setPage?.(2);
      });

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });

      act(() => {
        (setter as () => void)();
        context.applyCurrentFilter?.();
      });

      await waitFor(() => {
        expect(context.page).toEqual(1);
        expect(mockedAxios.get).toHaveBeenCalled();
      });
    },
  );
});

import { Store } from '@tanstack/react-store';
import { RouterHistory } from '@tanstack/history';
import { AnyRedirect, AnyRoute, AnyRouteMatch, AnyRouter, BuildLocationFn, BuildNextOptions, ClearCacheFn, CommitLocationFn, CommitLocationOptions, ControlledPromise, Router as CoreRouter, EmitFn, FullSearchSchema, GetMatchFn, GetMatchRoutesFn, InjectedHtmlEntry, InvalidateFn, LoadFn, MakeRouteMatch, Manifest, MatchRouteFn, MatchRoutesFn, NavigateFn, ParseLocationFn, ParsedLocation, PickAsRequired, PreloadRouteFn, ResolvedRedirect, RouterConstructorOptions, RouterEvent, RouterListener, RouterOptions, RouterState, RoutesById, RoutesByPath, StartSerializer, StartTransitionFn, SubscribeFn, TrailingSlashOption, UpdateFn, UpdateMatchFn, ViewTransitionOptions } from '@tanstack/router-core';
import { ErrorRouteComponent, NotFoundRouteComponent, RouteComponent } from './route.cjs';
import { NotFoundError } from './not-found.cjs';
import type * as React from 'react';
declare module '@tanstack/router-core' {
    interface RouterOptionsExtensions {
        /**
         * The default `component` a route should use if no component is provided.
         *
         * @default Outlet
         * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#defaultcomponent-property)
         */
        defaultComponent?: RouteComponent;
        /**
         * The default `errorComponent` a route should use if no error component is provided.
         *
         * @default ErrorComponent
         * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#defaulterrorcomponent-property)
         * @link [Guide](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#handling-errors-with-routeoptionserrorcomponent)
         */
        defaultErrorComponent?: ErrorRouteComponent;
        /**
         * The default `pendingComponent` a route should use if no pending component is provided.
         *
         * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#defaultpendingcomponent-property)
         * @link [Guide](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#showing-a-pending-component)
         */
        defaultPendingComponent?: RouteComponent;
        /**
         * The default `notFoundComponent` a route should use if no notFound component is provided.
         *
         * @default NotFound
         * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#defaultnotfoundcomponent-property)
         * @link [Guide](https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors#default-router-wide-not-found-handling)
         */
        defaultNotFoundComponent?: NotFoundRouteComponent;
        /**
         * A component that will be used to wrap the entire router.
         *
         * This is useful for providing a context to the entire router.
         *
         * Only non-DOM-rendering components like providers should be used, anything else will cause a hydration error.
         *
         * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#wrap-property)
         */
        Wrap?: (props: {
            children: any;
        }) => React.JSX.Element;
        /**
         * A component that will be used to wrap the inner contents of the router.
         *
         * This is useful for providing a context to the inner contents of the router where you also need access to the router context and hooks.
         *
         * Only non-DOM-rendering components like providers should be used, anything else will cause a hydration error.
         *
         * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#innerwrap-property)
         */
        InnerWrap?: (props: {
            children: any;
        }) => React.JSX.Element;
        /**
         * The default `onCatch` handler for errors caught by the Router ErrorBoundary
         *
         * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#defaultoncatch-property)
         * @link [Guide](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#handling-errors-with-routeoptionsoncatch)
         */
        defaultOnCatch?: (error: Error, errorInfo: React.ErrorInfo) => void;
    }
}
export declare const componentTypes: readonly ["component", "errorComponent", "pendingComponent", "notFoundComponent"];
export declare function createRouter<TRouteTree extends AnyRoute, TTrailingSlashOption extends TrailingSlashOption, TDefaultStructuralSharingOption extends boolean, TRouterHistory extends RouterHistory = RouterHistory, TDehydrated extends Record<string, any> = Record<string, any>>(options: undefined extends number ? 'strictNullChecks must be enabled in tsconfig.json' : RouterConstructorOptions<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory, TDehydrated>): CoreRouter<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory, TDehydrated>;
export declare class Router<in out TRouteTree extends AnyRoute, in out TTrailingSlashOption extends TrailingSlashOption, in out TDefaultStructuralSharingOption extends boolean, in out TRouterHistory extends RouterHistory = RouterHistory, in out TDehydrated extends Record<string, any> = Record<string, any>> implements CoreRouter<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory, TDehydrated> {
    tempLocationKey: string | undefined;
    resetNextScroll: boolean;
    shouldViewTransition?: boolean | ViewTransitionOptions;
    isViewTransitionTypesSupported?: boolean;
    subscribers: Set<RouterListener<RouterEvent>>;
    viewTransitionPromise?: ControlledPromise<true>;
    isScrollRestoring: boolean;
    isScrollRestorationSetup: boolean;
    __store: Store<RouterState<TRouteTree>>;
    options: PickAsRequired<RouterOptions<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory, TDehydrated>, 'stringifySearch' | 'parseSearch' | 'context'>;
    history: TRouterHistory;
    latestLocation: ParsedLocation<FullSearchSchema<TRouteTree>>;
    basepath: string;
    routeTree: TRouteTree;
    routesById: RoutesById<TRouteTree>;
    routesByPath: RoutesByPath<TRouteTree>;
    flatRoutes: Array<AnyRoute>;
    isServer: boolean;
    pathParamsDecodeCharMap?: Map<string, string>;
    /**
     * @deprecated Use the `createRouter` function instead
     */
    constructor(options: RouterConstructorOptions<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory, TDehydrated>);
    startTransition: StartTransitionFn;
    update: UpdateFn<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory, TDehydrated>;
    get state(): RouterState<TRouteTree, import('@tanstack/router-core').RouteMatch<any, any, any, any, any, any, any>>;
    buildRouteTree: () => void;
    subscribe: SubscribeFn;
    emit: EmitFn;
    parseLocation: ParseLocationFn<TRouteTree>;
    resolvePathWithBase: (from: string, path: string) => string;
    get looseRoutesById(): Record<string, AnyRoute>;
    /**
    @deprecated use the following signature instead
    ```ts
    matchRoutes (
      next: ParsedLocation,
      opts?: { preload?: boolean; throwOnError?: boolean },
    ): Array<AnyRouteMatch>;
    ```
  */
    matchRoutes: MatchRoutesFn;
    private matchRoutesInternal;
    getMatchedRoutes: GetMatchRoutesFn;
    cancelMatch: (id: string) => void;
    cancelMatches: () => void;
    buildLocation: BuildLocationFn;
    commitLocationPromise: undefined | ControlledPromise<void>;
    commitLocation: CommitLocationFn;
    buildAndCommitLocation: ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, href, ...rest }?: BuildNextOptions & CommitLocationOptions) => Promise<void>;
    navigate: NavigateFn;
    latestLoadPromise: undefined | Promise<void>;
    load: LoadFn;
    startViewTransition: (fn: () => Promise<void>) => void;
    updateMatch: UpdateMatchFn;
    getMatch: GetMatchFn;
    loadMatches: ({ location, matches, preload: allPreload, onReady, updateMatch, sync, }: {
        location: ParsedLocation;
        matches: Array<AnyRouteMatch>;
        preload?: boolean;
        onReady?: () => Promise<void>;
        updateMatch?: (id: string, updater: (match: AnyRouteMatch) => AnyRouteMatch) => void;
        getMatch?: (matchId: string) => AnyRouteMatch | undefined;
        sync?: boolean;
    }) => Promise<Array<MakeRouteMatch>>;
    invalidate: InvalidateFn<Router<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory, TDehydrated>>;
    resolveRedirect: (err: AnyRedirect) => ResolvedRedirect;
    clearCache: ClearCacheFn<this>;
    clearExpiredCache: () => void;
    loadRouteChunk: (route: AnyRoute) => Promise<void[]>;
    preloadRoute: PreloadRouteFn<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory>;
    matchRoute: MatchRouteFn<TRouteTree, TTrailingSlashOption, TDefaultStructuralSharingOption, TRouterHistory>;
    ssr?: {
        manifest: Manifest | undefined;
        serializer: StartSerializer;
    };
    serverSsr?: {
        injectedHtml: Array<InjectedHtmlEntry>;
        injectHtml: (getHtml: () => string | Promise<string>) => Promise<void>;
        injectScript: (getScript: () => string | Promise<string>, opts?: {
            logScript?: boolean;
        }) => Promise<void>;
        streamValue: (key: string, value: any) => void;
        streamedKeys: Set<string>;
        onMatchSettled: (opts: {
            router: AnyRouter;
            match: AnyRouteMatch;
        }) => any;
    };
    clientSsr?: {
        getStreamedValue: <T>(key: string) => T | undefined;
    };
    _handleNotFound: (matches: Array<AnyRouteMatch>, err: NotFoundError, { updateMatch, }?: {
        updateMatch?: (id: string, updater: (match: AnyRouteMatch) => AnyRouteMatch) => void;
    }) => void;
    hasNotFoundMatch: () => boolean;
}
export declare function lazyFn<T extends Record<string, (...args: Array<any>) => any>, TKey extends keyof T = 'default'>(fn: () => Promise<T>, key?: TKey): (...args: Parameters<T[TKey]>) => Promise<Awaited<ReturnType<T[TKey]>>>;
export declare class SearchParamError extends Error {
}
export declare class PathParamError extends Error {
}
export declare function getInitialRouterState(location: ParsedLocation): RouterState<any>;

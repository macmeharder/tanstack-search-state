import { AnyContext, AnyRoute, AnyRouter, Constrain, ConstrainLiteral, LazyRoute as CoreLazyRoute, Route as CoreRoute, ErrorComponentProps, NotFoundRouteProps, RegisteredRouter, ResolveFullPath, ResolveId, ResolveParams, RootRouteId, RootRouteOptions, RouteAddChildrenFn, RouteAddFileChildrenFn, RouteAddFileTypesFn, RouteConstraints, RouteIds, RouteLazyFn, RouteLoaderFn, RouteMask, RouteOptions, RouteTypes, RouteTypesById, Router, ToMaskOptions, TrimPathRight, UpdatableRouteOptions, UseNavigateResult } from '@tanstack/router-core';
import { UseLoaderDataRoute } from './useLoaderData.js';
import { UseMatchRoute } from './useMatch.js';
import { UseLoaderDepsRoute } from './useLoaderDeps.js';
import { UseParamsRoute } from './useParams.js';
import { UseSearchRoute } from './useSearch.js';
import { NotFoundError } from './not-found.js';
import { UseRouteContextRoute } from './useRouteContext.js';
import type * as React from 'react';
declare module '@tanstack/router-core' {
    interface UpdatableRouteOptionsExtensions {
        component?: RouteComponent;
        errorComponent?: false | null | ErrorRouteComponent;
        notFoundComponent?: NotFoundRouteComponent;
        pendingComponent?: RouteComponent;
    }
    interface RouteExtensions<TId extends string, TFullPath extends string> {
        useMatch: UseMatchRoute<TId>;
        useRouteContext: UseRouteContextRoute<TId>;
        useSearch: UseSearchRoute<TId>;
        useParams: UseParamsRoute<TId>;
        useLoaderDeps: UseLoaderDepsRoute<TId>;
        useLoaderData: UseLoaderDataRoute<TId>;
        useNavigate: () => UseNavigateResult<TFullPath>;
    }
}
export declare function getRouteApi<const TId, TRouter extends AnyRouter = RegisteredRouter>(id: ConstrainLiteral<TId, RouteIds<TRouter['routeTree']>>): RouteApi<TId, TRouter>;
export declare class RouteApi<TId, TRouter extends AnyRouter = RegisteredRouter> {
    id: TId;
    /**
     * @deprecated Use the `getRouteApi` function instead.
     */
    constructor({ id }: {
        id: TId;
    });
    useMatch: UseMatchRoute<TId>;
    useRouteContext: UseRouteContextRoute<TId>;
    useSearch: UseSearchRoute<TId>;
    useParams: UseParamsRoute<TId>;
    useLoaderDeps: UseLoaderDepsRoute<TId>;
    useLoaderData: UseLoaderDataRoute<TId>;
    useNavigate: () => UseNavigateResult<RouteTypesById<TRouter, TId>["fullPath"]>;
    notFound: (opts?: NotFoundError) => NotFoundError;
}
export declare class Route<in out TParentRoute extends RouteConstraints['TParentRoute'] = AnyRoute, in out TPath extends RouteConstraints['TPath'] = '/', in out TFullPath extends RouteConstraints['TFullPath'] = ResolveFullPath<TParentRoute, TPath>, in out TCustomId extends RouteConstraints['TCustomId'] = string, in out TId extends RouteConstraints['TId'] = ResolveId<TParentRoute, TCustomId, TPath>, in out TSearchValidator = undefined, in out TParams = ResolveParams<TPath>, in out TRouterContext = AnyContext, in out TRouteContextFn = AnyContext, in out TBeforeLoadFn = AnyContext, in out TLoaderDeps extends Record<string, any> = {}, in out TLoaderFn = undefined, in out TChildren = unknown, in out TFileRouteTypes = unknown> implements CoreRoute<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren, TFileRouteTypes> {
    isRoot: TParentRoute extends AnyRoute ? true : false;
    options: RouteOptions<TParentRoute, TId, TCustomId, TFullPath, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn>;
    parentRoute: TParentRoute;
    private _id;
    private _path;
    private _fullPath;
    private _to;
    private _ssr;
    get to(): TrimPathRight<TFullPath>;
    get id(): TId;
    get path(): TPath;
    get fullPath(): TFullPath;
    get ssr(): boolean;
    children?: TChildren;
    originalIndex?: number;
    rank: number;
    lazyFn?: () => Promise<CoreLazyRoute>;
    _lazyPromise?: Promise<void>;
    _componentsPromise?: Promise<Array<void>>;
    /**
     * @deprecated Use the `createRoute` function instead.
     */
    constructor(options?: RouteOptions<TParentRoute, TId, TCustomId, TFullPath, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn>);
    types: RouteTypes<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren, TFileRouteTypes>;
    init: (opts: {
        originalIndex: number;
        defaultSsr?: boolean;
    }) => void;
    addChildren: RouteAddChildrenFn<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TFileRouteTypes>;
    _addFileChildren: RouteAddFileChildrenFn<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TFileRouteTypes>;
    _addFileTypes: RouteAddFileTypesFn<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren>;
    updateLoader: <TNewLoaderFn>(options: {
        loader: Constrain<TNewLoaderFn, RouteLoaderFn<TParentRoute, TCustomId, TParams, TLoaderDeps, TRouterContext, TRouteContextFn, TBeforeLoadFn>>;
    }) => Route<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TNewLoaderFn, TChildren, TFileRouteTypes>;
    update: (options: UpdatableRouteOptions<TParentRoute, TCustomId, TFullPath, TParams, TSearchValidator, TLoaderFn, TLoaderDeps, TRouterContext, TRouteContextFn, TBeforeLoadFn>) => this;
    lazy: RouteLazyFn<this>;
    useMatch: UseMatchRoute<TId>;
    useRouteContext: UseRouteContextRoute<TId>;
    useSearch: UseSearchRoute<TId>;
    useParams: UseParamsRoute<TId>;
    useLoaderDeps: UseLoaderDepsRoute<TId>;
    useLoaderData: UseLoaderDataRoute<TId>;
    useNavigate: () => UseNavigateResult<TFullPath>;
}
export declare function createRoute<TParentRoute extends RouteConstraints['TParentRoute'] = AnyRoute, TPath extends RouteConstraints['TPath'] = '/', TFullPath extends RouteConstraints['TFullPath'] = ResolveFullPath<TParentRoute, TPath>, TCustomId extends RouteConstraints['TCustomId'] = string, TId extends RouteConstraints['TId'] = ResolveId<TParentRoute, TCustomId, TPath>, TSearchValidator = undefined, TParams = ResolveParams<TPath>, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined, TChildren = unknown>(options: RouteOptions<TParentRoute, TId, TCustomId, TFullPath, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, AnyContext, TRouteContextFn, TBeforeLoadFn>): CoreRoute<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, AnyContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren, unknown>;
export type AnyRootRoute = RootRoute<any, any, any, any, any, any, any, any>;
export declare function createRootRouteWithContext<TRouterContext extends {}>(): <TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TSearchValidator = undefined, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined>(options?: RootRouteOptions<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>) => RootRoute<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, unknown, unknown>;
/**
 * @deprecated Use the `createRootRouteWithContext` function instead.
 */
export declare const rootRouteWithContext: typeof createRootRouteWithContext;
export declare class RootRoute<in out TSearchValidator = undefined, in out TRouterContext = {}, in out TRouteContextFn = AnyContext, in out TBeforeLoadFn = AnyContext, in out TLoaderDeps extends Record<string, any> = {}, in out TLoaderFn = undefined, in out TChildren = unknown, in out TFileRouteTypes = unknown> extends Route<any, // TParentRoute
'/', // TPath
'/', // TFullPath
string, // TCustomId
RootRouteId, // TId
TSearchValidator, // TSearchValidator
{}, // TParams
TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren, // TChildren
TFileRouteTypes> {
    /**
     * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
     */
    constructor(options?: RootRouteOptions<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>);
}
export declare function createRootRoute<TSearchValidator = undefined, TRouterContext = {}, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined>(options?: RootRouteOptions<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>): RootRoute<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, unknown, unknown>;
export declare function createRouteMask<TRouteTree extends AnyRoute, TFrom extends string, TTo extends string>(opts: {
    routeTree: TRouteTree;
} & ToMaskOptions<Router<TRouteTree, 'never', boolean>, TFrom, TTo>): RouteMask<TRouteTree>;
export type ReactNode = any;
export type SyncRouteComponent<TProps> = ((props: TProps) => ReactNode) | React.LazyExoticComponent<(props: TProps) => ReactNode>;
export type AsyncRouteComponent<TProps> = SyncRouteComponent<TProps> & {
    preload?: () => Promise<void>;
};
export type RouteComponent<TProps = any> = AsyncRouteComponent<TProps>;
export type ErrorRouteComponent = RouteComponent<ErrorComponentProps>;
export type NotFoundRouteComponent = SyncRouteComponent<NotFoundRouteProps>;
export declare class NotFoundRoute<TParentRoute extends AnyRootRoute, TRouterContext = AnyContext, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TSearchValidator = undefined, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined, TChildren = unknown> extends Route<TParentRoute, '/404', '/404', '404', '404', TSearchValidator, {}, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren> {
    constructor(options: Omit<RouteOptions<TParentRoute, string, string, string, string, TSearchValidator, {}, TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn>, 'caseSensitive' | 'parseParams' | 'stringifyParams' | 'path' | 'id' | 'params'>);
}

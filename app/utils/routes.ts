type QueryParams = Record<string, string | number>;

const routes = {
    'auth.forgot': '/auth/forgot-password',
    'auth.login': '/auth/login',
    'auth.register': '/auth/register',
    user: (opt: QueryParams) => `/user/${opt.id}`,
};

export const route = (name: keyof typeof routes, options?: QueryParams) => {
    if (typeof routes[name] === 'function') {
        return !options ? '/404' : routes[name](options);
    }

    return routes[name];
};

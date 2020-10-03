import glue from 'schemaglue';
export { schemaDirectives } from './directives';

const options = {
    js: '**/*.js', // default
};

export const { schema, resolver } = glue('src/graphql', options);

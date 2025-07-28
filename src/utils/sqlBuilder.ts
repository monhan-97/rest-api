import knex from 'knex';

const sqlBuilder = knex({
  client: 'pg',
});

export default sqlBuilder;

export type Environment = 'qa' | 'dev';

export const ENV: Environment = (process.env.ENV as Environment) || 'qa';



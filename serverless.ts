import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import user from '@functions/user/user.serverless';
import exam from '@functions/exam/exam.serverless';
import subject from '@functions/subject/subject.serverless';

const serverlessConfiguration: AWS = {
  service: 'exam-scheduler-backend',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { 
    ...hello,
    ...user,
    ...exam,
    ...subject
   },
};

module.exports = serverlessConfiguration;

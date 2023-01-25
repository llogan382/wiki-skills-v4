import { App, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { aws_s3 as s3 } from 'aws-cdk-lib';
import { StackProps } from '@aws-cdk/core/lib/stack';

export class MyFirstStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket =  new s3.Bucket(this, 'MyFirstBucket');
  }
}

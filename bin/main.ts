#!/usr/bin/env node
import { App, Stack } from 'aws-cdk-lib';
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyFirstStack } from '../lib/s3-cdk-app';


const app = new cdk.App();
new MyFirstStack(app, "HelloCdkStack");


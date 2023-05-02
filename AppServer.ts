import * as path from 'path';
import * as express from 'express';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import {App} from './App';

console.log('AppServer called')
let server: any = new App().expressApp;
server.listen(8080);
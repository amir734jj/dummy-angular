import urlJoin from 'url-join';
import {API_URL} from "../models/constants/api";

const route = (...arg: any[]) => urlJoin(API_URL, ...arg.filter(x => x).map(x => x.toString()));

export default route;

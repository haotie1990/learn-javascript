import { name as ModuleA } from './ModuleA';
import print from './moduleB';
import('./moduleC.js').then(module => console.log(module));
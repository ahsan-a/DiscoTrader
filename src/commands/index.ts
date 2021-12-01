import { Ping } from './ping';
import { Command } from '../types';

const commands: { [key: string]: Command } = { ping: new Ping() };

export default commands;

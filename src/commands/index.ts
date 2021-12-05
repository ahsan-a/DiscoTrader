import { SignUp } from './user';
import { Command } from '../types';

const commands: { [key: string]: Command } = { signup: new SignUp() };

export default commands;

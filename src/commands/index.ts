import { SignUp, Balance } from './user';
import { Command } from '../types';

const commands: { [key: string]: Command } = { signup: new SignUp(), balance: new Balance() };

export default commands;

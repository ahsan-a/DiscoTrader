import { SignUp, Balance } from './user';
import { Buy } from './trading';

import { Command } from '../types';

const commands: { [key: string]: Command } = { signup: new SignUp(), balance: new Balance(), buy: new Buy() };

export default commands;

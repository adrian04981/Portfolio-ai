/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  day: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  WORK = 'work',
  ABOUT = 'about',
  CONTACT = 'contact',
}

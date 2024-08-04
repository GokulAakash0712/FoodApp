import { Food } from './app/shared/models/Food';
import { Tag } from './app/shared/models/Tag';

export const sample_foods: Food[] = [
  {
    id: '1',
    name: 'Chicken Burger',
    price: 120,
    cookTime: '40-50',
    favorite: false,
    origins: ['India'],
    stars: 4.0,
    imageUrl: '',
    tags: ['FastFood', 'Burger', 'Chicken'],
  },
  {
    id: '2',
    name: 'Chicken Sandwidch',
    price: 150,
    cookTime: '40-50',
    favorite: true,
    origins: ['India'],
    stars: 4.2,
    imageUrl: '',
    tags: ['FastFood', 'Sandwidch', 'Chicken'],
  },
  {
    id: '3',
    name: 'Pizza',
    price: 100,
    cookTime: '40-50',
    favorite: false,
    origins: ['India'],
    stars: 3.5,
    imageUrl: '',
    tags: ['FastFood', 'Pizza'],
  },
  {
    id: '4',
    name: 'Chicken Shawarma',
    price: 120,
    cookTime: '40-50',
    favorite: true,
    origins: ['India'],
    stars: 4.5,
    imageUrl: '',
    tags: ['FastFood', 'Shawarma', 'Chicken'],
  },
  {
    id: '5',
    name: 'BBQ Shawarma',
    price: 150,
    cookTime: '40-50',
    favorite: true,
    origins: ['India'],
    stars: 4.5,
    imageUrl: '',
    tags: ['FastFood', 'Shawarma', 'BBQ'],
  },
];

export const sample_tags: Tag[] = [
  { name: 'All', count: 5 },
  { name: 'Pizza', count: 1 },
  { name: 'Burger', count: 1 },
  { name: 'Sandwidch', count: 1 },
  { name: 'Shawarma', count: 2 },
];

export type User = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isAdmin: boolean;
};

export type Filters = {
  readonly id: number;
  readonly name: string;
  readonly author: string;
  readonly slug: string;
  readonly room: string;
  readonly place: string;
  readonly series: string;
};

export type Book = {
  readonly id: number;
  readonly name: string;
  readonly author: string;
  readonly img: string;
  readonly slug: string;
  readonly room: string;
  readonly place: string;
  readonly description: string;
  readonly series: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly UserBookRate: BookRate[];
  readonly BookTag: BookTag[];
};

export type BookRate = {
  readonly bookId: number;
  readonly userId: number;
  readonly rate: number;
};

export type BookTag = {
  readonly bookId: number;
  readonly tagName: string;
};

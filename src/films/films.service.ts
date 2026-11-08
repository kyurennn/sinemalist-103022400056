import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import * as fs from 'fs';
import * as path from 'path';

export interface Film {
  id: string;
  judul: string;
  genre: string;
  tahun: number;
  rating: number;
  sudahDitonton: boolean;
}

@Injectable()
export class FilmsService {
  private films: Film[] = [];

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    try {
      const filePath = path.join(process.cwd(), 'src', 'films.json');
      const fileData = fs.readFileSync(filePath, 'utf8');
      this.films = JSON.parse(fileData);
      console.log('Data awal films.json berhasil dimuat. Total:', this.films.length);
    } catch (error) {
      console.error('Gagal memuat src/films.json:', (error as Error).message);
      this.films = [];
    }
  }

  findAll(ditonton?: string): Film[] {
    if (ditonton !== undefined) {
      const isDitonton = ditonton === 'true';
      return this.films.filter((film) => film.sudahDitonton === isDitonton);
    }
    return this.films;
  }

  findOne(id: string): Film {
    const film = this.films.find((f) => f.id === id);
    if (!film) {
      throw new NotFoundException(`Film dengan ID '${id}' tidak ditemukan`);
    }
    return film;
  }

  create(createFilmDto: CreateFilmDto): Film {
    const newFilm: Film = {
      id: Date.now().toString(),
      judul: createFilmDto.judul,
      genre: createFilmDto.genre,
      tahun: createFilmDto.tahun,
      rating: createFilmDto.rating,
      sudahDitonton: createFilmDto.sudahDitonton ?? false,
    };
    this.films.push(newFilm);
    return newFilm;
  }

  updateStatus(id: string, updateFilmDto: UpdateFilmDto): Film {
    const film = this.findOne(id);
    if (updateFilmDto.sudahDitonton !== undefined) {
      film.sudahDitonton = updateFilmDto.sudahDitonton;
    } else {
      film.sudahDitonton = !film.sudahDitonton;
    }
    return film;
  }

  remove(id: string): { message: string } {
    const index = this.films.findIndex((f) => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`Film dengan ID '${id}' tidak ditemukan`);
    }
    this.films.splice(index, 1);
    return { message: `Film dengan ID '${id}' berhasil dihapus` };
  }
}
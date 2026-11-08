import { IsNotEmpty, IsString, IsInt, Min, Max, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty({ message: 'Judul wajib diisi' })
  @IsString({ message: 'Judul harus berupa teks' })
  judul: string;

  @IsNotEmpty({ message: 'Genre wajib diisi' })
  @IsString({ message: 'Genre harus berupa teks' })
  genre: string;

  @IsInt({ message: 'Tahun harus berupa bilangan bulat' })
  @Min(1900, { message: 'Tahun minimal 1900' })
  @Max(2030, { message: 'Tahun maksimal 2030' })
  tahun: number;

  @IsNumber({}, { message: 'Rating harus berupa angka' })
  @Min(0, { message: 'Rating minimal 0' })
  @Max(10, { message: 'Rating maksimal 10' })
  rating: number;

  @IsOptional()
  @IsBoolean({ message: 'sudahDitonton harus berupa boolean' })
  sudahDitonton?: boolean;
}
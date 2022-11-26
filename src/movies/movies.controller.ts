import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller(`movies`)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(`:id`)
  getOne(@Param(`id`) movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(`:id`)
  remove(@Param(`id`) movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(`:id`)
  path(@Param(`id`) movieId: number, @Body() updateMovie: UpdateMovieDto) {
    return { updatedMovie: movieId, ...updateMovie };
  }
}

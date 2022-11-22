import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { create } from 'domain';

@Controller(`movies`)
export class MoviesController {
  @Get()
  getAll() {
    return 'This retrun all movies';
  }

  @Get(`/:id`)
  getOne(@Param(`id`) movieId: string) {
    return `This return a movie id: ${movieId}`;
  }

  @Post()
  create() {
    return `create Movie`;
  }

  @Delete(`/:id`)
  remove(@Param(`id`) movieId: string) {
    return `remove Movie id:${movieId}`;
  }

  @Patch(`/:id`)
  path(@Param(`id`) movieId: string) {
    return `remove Movie id:${movieId}`;
  }
}

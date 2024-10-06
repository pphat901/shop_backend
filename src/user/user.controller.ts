import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { buildPagination } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/decorator/role.enum';
import { RoleAuthGuard } from 'src/auth/guards/role-jwt.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.service.create(createUser);
  }

  @Roles(Role.ADMIN)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const users = await this.service.getAll(params);

    return buildPagination(users, params);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.service.updateUser(id, updateUser);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    return this.service.updateStatusUser(id, status);
  }
}

import {
  JsonController,
  Get,
  CurrentUser,
  Body,
  Delete,
  Put,
  UseInterceptor,
  HttpCode,
} from 'routing-controllers';
import { BaseController } from './BaseController';
import { User } from '../model';
import { UserService } from '../service/UserService';
import { ResponseJosnInterceptor } from '../interceptor/ResponseJsonInterceptor';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { IuserDTOClass } from '../dto/UserDTO';

@JsonController('/user')
@UseInterceptor(ResponseJosnInterceptor)
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }
  @Get()
  @HttpCode(200)
  @OpenAPI({
    summary: 'get user',
    description: 'get an user with jwt token',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(User)
  async getUser(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Put()
  @HttpCode(201)
  @OpenAPI({
    summary: 'edit user',
    description: 'update user',
    security: [{ bearerAuth: [] }], // Applied to each metho
  })
  @ResponseSchema(User)
  async editUser(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Partial<IuserDTOClass>,
  ) {
    const editUser = await this.userService.createOrUpdate(
      body,
      user.userAccount.clientId,
    );
    return editUser;
  }

  @Delete()
  @HttpCode(204)
  @OpenAPI({
    summary: 'delete user',
    description: 'sofrt delete user',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(User)
  async deleteUser(@CurrentUser({ required: true }) user: User) {
    // soft delete
    const editUser = await this.userService.createOrUpdate(
      { deletedAt: new Date() },
      user.userAccount.clientId,
    );
    return editUser;
  }
}

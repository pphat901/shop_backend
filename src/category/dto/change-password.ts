import { IsStrongPassword } from 'class-validator';

export class changePasswordDto {
  old_password: string;

  @IsStrongPassword()
  new_password: string;
}

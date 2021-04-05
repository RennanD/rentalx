import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository
  ) {}
  public async execute({ user_id, avatar }: IRequest): Promise<void> {
    const user = await this.usersRespository.findById(user_id);

    user.avatar = avatar;

    await this.usersRespository.save(user);
  }
}

export { UpdateUserAvatarUseCase };

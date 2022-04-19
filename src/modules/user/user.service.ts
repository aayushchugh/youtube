import { User, UserModel } from './user.model';

export const createUser = (
	user: Omit<User, 'comparePassword'>
): Promise<object> => {
	return UserModel.create(user);
};

export const findUserByEmail = (email: User['email']) => {
	return UserModel.findOne({ email });
};

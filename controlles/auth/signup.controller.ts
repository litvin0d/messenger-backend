import User from '../../models/user.model';

type signupData = {
	fullName: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: 'male' | 'female';
};

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender }: signupData = req.body;

		if (password !== confirmPassword) return res.status(400).json({ error: "Password doesn't match" });

		const user = await User.findOne({ username });

		if (user) return res.status(400).json({ error: 'User already exists' });

		// TODO: HASH PASSWORD

		const profilePic = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			profilePic,
		});

		await newUser.save();

		res.status(201).json({
			_id: newUser._id,
			fullName: newUser.fullName,
			username: newUser.username,
			password: newUser.password,
			gender: newUser.gender,
			profilePic: profilePic,
		});
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
		});
		throw new Error(`Signup error: ${error.message}`);
	}
};

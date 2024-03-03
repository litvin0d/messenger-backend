import type { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 });
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
		});

		if (error instanceof Error) throw new Error(`Logout error: ${error.message}`);
	}
};

router.get('/verify-email/:token', async (req, res) => {
    const { token } = req.params;

    // Log token received
    console.log('Received token:', token);

    try {
        // Decode the JWT token
        const decoded = jwt.verify(token, process.env.jwtSecret);
        console.log('Decoded JWT:', decoded); // Log decoded token to ensure it's correct

        // Find the user by decoded userId
        const user = await User.findById(decoded.userId);
        if (!user) {
            console.log('User not found with ID:', decoded.userId);
            return res.status(400).json({ errors: [{ msg: 'User not found' }] });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            console.log('User already verified');
            return res.status(400).json({ errors: [{ msg: 'User already verified' }] });
        }

        // Update the user as verified
        user.isVerified = true;
        const updatedUser = await user.save();
        console.log('Updated user:', updatedUser); // Log the updated user to ensure isVerified is true

        res.json({ success: true, msg: 'Email verified successfully' });
    } catch (err) {
        console.error('Error during verification:', err); // Log any errors during processing
        res.status(400).json({ errors: [{ msg: 'Invalid or expired token' }] });
    }
});
